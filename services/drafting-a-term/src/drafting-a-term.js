#!/usr/bin/env node
/**
 * @skill drafting-a-term
 * @verb-phrase drafting a term
 * @closure-kind inquiry
 * @model nvidia/nemotron-3-nano-30b-a3b
 * @fuel 3 turns
 * @description Takes a term request (slug, domain, context) as JSON on stdin, actuates a bounded NVIDIA cloud model to draft a glossary term record, validates the draft through read-a-schema.js against emsenn/schema/term, and on a failed validation feeds the model its own errors and retries — at most @fuel times. Emits either a valid draft record or a structured refusal listing every unmet error; never seats the draft into content/glossary/ itself. Use when a term is owed but drafting it word-for-word is not the highest use of a Claude session — the reliability lives in the validate-and-repair loop, not the model.
 *
 * @precondition stdin carries a JSON term request naming at least slug
 * @precondition API_KEY_INFERENCE_NVIDIA is set in the environment; refused, never printed or written, if absent
 * @precondition emsenn/schema/term is seated and reachable through read-a-schema.js from --from
 * @postcondition every candidate is checked by read-a-schema.js — the one validator — never a private copy of its rules
 * @postcondition the actuator makes at most @fuel attempts and stops the instant one attempt validates
 * @postcondition on exhausting @fuel with no valid attempt, a structured refusal lists every attempt's unmet errors and nothing is emitted as if it had passed
 * @postcondition a valid draft is written only to stdout or --draft-dir, never to content/glossary/ — seating a term is the content-librarian's act
 * @witness the request read, the model actuated, and the fuel cap in force
 * @witness every attempt's validity and validation errors, so raw first-attempt validity and post-repair validity are both on the record
 * @witness on refusal, every attempt's unmet errors
 *
 * The actuator harness made concrete. "We cannot expect any LLM to produce
 * well-formed output, but we can expect it to get close" (the Chairperson,
 * on this pilot) — so the model is asked once, its answer is checked against
 * the one class the firm already has for a term (emsenn/schema/term), and if
 * it does not conform, the model is shown exactly what did not conform and
 * asked again. Reliability is the loop's property, not the model's: fuel
 * bounds how many times the loop may try before it reports, honestly, that
 * it could not close the gap.
 *
 * This is closure-kind inquiry: both sigma and delta are open here — the
 * model's output is not deterministic, and the words it draws on are not
 * fixed by this script — bounded only by the fuel discipline skill.schema.json
 * requires of the position. It is not closure-kind derivation, because a
 * derivation reaches a typed judgment by fixed rules or reports it reached
 * none; this reaches PROSE by a non-deterministic model, and only the
 * validation of that prose against a schema is fixed.
 *
 * ## Run it
 *
 * ```sh
 * set -a; . ./.env; set +a   # loads API_KEY_INFERENCE_NVIDIA — never hardcode it
 * echo '{"slug":"rendanheyi-node","domain":"organizational-design","context":"a firm unit that pairs a rendanheyi micro-enterprise with an internal huidu-hull"}' \
 *   | node .../drafting-a-term.js
 *
 * node .../drafting-a-term.js --draft-dir /tmp/drafts   < request.json
 * node .../drafting-a-term.js --model nvidia/nemotron-3-nano-30b-a3b --fuel 3   < request.json
 * ```
 *
 * Input is JSON on stdin: `{"slug": "...", "domain": "...", "context": "..."}`.
 * `slug` is required; `domain` and `context` are folded into the prompt when
 * given. Output is JSON: `{ok: true, draft, "first-attempt-valid", "fuel-spent",
 * attempts}` on success, `{ok: false, refusal: true, "fuel-spent", attempts}`
 * on exhaustion — exit 0 and 1 respectively.
 *
 * `--from` (default: the caller's working directory) is where read-a-schema.js
 * is asked to resolve emsenn/schema/term from. `--draft-dir <dir>` additionally
 * writes the valid draft to `<dir>/<slug>.json`; without it the draft is stdout
 * only. `--model` and `--fuel` override the header's declared defaults for a
 * single run — the header's own @model and @fuel are what the schema and the
 * pilot's allocation actually bind.
 *
 * ## When NOT to use
 *
 * - Not to seat a term. A valid draft is a draft; content-librarian's own
 *   instrument (writing-a-term) is what puts a term in the glossary, after a
 *   person or office decided the draft is right.
 * - Not for a term whose shape a fixed rule could derive instead. If sigma
 *   is closed — the content follows deterministically from named sources —
 *   this is the wrong closure-kind; use a derivation instead.
 * - Not without the fuel cap loaded. Running the actuator unbounded is not
 *   "still inside the allocation" — read the decision record before raising it.
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const NODE_ROOT = dirname(HERE);
const FROM = argValue("--from") ?? process.cwd();
const DRAFT_DIR = argValue("--draft-dir");
const MODEL = argValue("--model") ?? "nvidia/nemotron-3-nano-30b-a3b";
const FUEL = Number(argValue("--fuel") ?? 3);
const ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

function out(value, code = 0) {
  process.stdout.write(JSON.stringify(value, null, 2) + "\n");
  process.exit(code);
}

const die = (message) => out({ ok: false, error: message }, 1);

if (process.argv.includes("--help")) {
  process.stdout.write(
    [
      "Usage:",
      "  set -a; . ./.env; set +a",
      '  echo \'{"slug":"...","domain":"...","context":"..."}\' | node drafting-a-term.js',
      "  node drafting-a-term.js --draft-dir /tmp/drafts   < request.json",
      "  node drafting-a-term.js --model <id> --fuel <n>   < request.json",
      "  node drafting-a-term.js --help",
    ].join("\n") + "\n",
  );
  process.exit(0);
}

if (!Number.isInteger(FUEL) || FUEL < 1) die(`⊥ fuel must be a positive integer, got '${argValue("--fuel")}'`);

const READ_SCHEMA = fileURLToPath(import.meta.resolve("@red-cup-engineering/json-schema-services-section/read-a-schema"));
const SCHEMA_POOL = join(NODE_ROOT, "lib/schemas");

function readTermSchema() {
  const r = spawnSync(process.execPath, [READ_SCHEMA, "term", "--pool", SCHEMA_POOL, "--show"], { encoding: "utf8" });
  let verdict = null;
  try {
    verdict = JSON.parse(r.stdout);
  } catch {
    die(`⊥ reading-a-schema returned nothing parseable for --show: ${(r.stderr || r.stdout || "").trim()}`);
  }
  if (!verdict?.ok) die(`⊥ emsenn/schema/term did not read: ${verdict?.error ?? "unknown"}`);
  return verdict.schema;
}

// The one validator, called and never copied.
function validateTerm(record) {
  const r = spawnSync(process.execPath, [READ_SCHEMA, "term", "--pool", SCHEMA_POOL], {
    input: JSON.stringify(record),
    encoding: "utf8",
  });
  let verdict = null;
  try {
    verdict = JSON.parse(r.stdout);
  } catch {
    return [`reading-a-schema returned nothing parseable: ${(r.stderr || r.stdout || "").trim()}`];
  }
  return verdict.ok ? [] : (verdict.errors ?? [verdict.error]);
}

// ── the request ────────────────────────────────────────────────────────────
const input = readFileSync(0, "utf8").trim();
if (!input) die("no term request on stdin — this drafts from a request: {slug, domain, context}");
let request;
try {
  request = JSON.parse(input);
} catch (e) {
  die(`stdin is not JSON: ${e.message}`);
}
if (!request || typeof request !== "object" || Array.isArray(request)) die("the term request must be a JSON object");
if (!request.slug || typeof request.slug !== "string") die("the term request must carry a 'slug' — the term's identity is not this instrument's to invent");

// ── the key ────────────────────────────────────────────────────────────────
// NEVER hardcoded, printed, or written anywhere. It lives in the environment;
// the caller loads it from .env before invoking this script.
const API_KEY = process.env.API_KEY_INFERENCE_NVIDIA;
if (!API_KEY) {
  die("⊥ API_KEY_INFERENCE_NVIDIA is not set — refusing rather than drafting unauthenticated. Load it first: set -a; . ./.env; set +a");
}

const termSchema = readTermSchema();

function systemPrompt() {
  return [
    "You draft glossary term records for a firm's internal glossary — never a general-purpose encyclopedia entry.",
    "Return ONLY a single JSON object: no markdown code fences, no commentary before or after it.",
    "The object must validate against this JSON Schema exactly (additionalProperties is false — any key not named under \"properties\" is a failure):",
    JSON.stringify(termSchema, null, 2),
    "",
    "Field guidance:",
    "- id: exactly the slug given in the request, lowercase-kebab.",
    "- name: the term as it would be said, title case is fine.",
    "- definition: 3-6 sentences of precise, first-principles prose a reader would use — the term's meaning, not a restatement of its name. This is the field a reader relies on; write it as carefully as the seated glossary entries do.",
    "Do not invent a 'specified-by', 'see-also', 'x-source', or 'x-provenance' unless the request gives you grounds to.",
  ].join("\n");
}

function userPrompt(req) {
  const lines = [`Term request:`, JSON.stringify(req, null, 2), "", "Draft the term record now, as one JSON object."];
  return lines.join("\n");
}

function repairPrompt(errors) {
  return [
    "That draft failed validation against emsenn/schema/term:",
    ...errors.map((e) => `- ${e}`),
    "Return ONLY the corrected JSON object, fixing every error listed. Still no markdown fences, no commentary.",
  ].join("\n");
}

async function actuate(messages) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, messages, temperature: 0.2, max_tokens: 1200 }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`nvidia endpoint ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

function extractJson(text) {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/u.exec(text);
  const body = fenced ? fenced[1] : text;
  const first = body.indexOf("{");
  const last = body.lastIndexOf("}");
  if (first === -1 || last === -1 || last < first) return { error: "no JSON object found in the model's output" };
  try {
    return { value: JSON.parse(body.slice(first, last + 1)) };
  } catch (e) {
    return { error: `model output is not parseable JSON: ${e.message}` };
  }
}

async function run() {
  const messages = [
    { role: "system", content: systemPrompt() },
    { role: "user", content: userPrompt(request) },
  ];

  const attempts = [];
  let draft = null;

  for (let i = 1; i <= FUEL; i++) {
    let raw;
    try {
      raw = await actuate(messages);
    } catch (e) {
      attempts.push({ attempt: i, valid: false, errors: [`actuation failed: ${e.message}`] });
      break; // fuel is not spent chasing a dead endpoint
    }

    const parsed = extractJson(raw);
    if (parsed.error) {
      attempts.push({ attempt: i, raw, valid: false, errors: [parsed.error] });
      messages.push({ role: "assistant", content: raw });
      messages.push({ role: "user", content: repairPrompt([parsed.error]) });
      continue;
    }

    const errors = validateTerm(parsed.value);
    attempts.push({ attempt: i, raw, candidate: parsed.value, valid: errors.length === 0, errors });
    if (errors.length === 0) {
      draft = parsed.value;
      break;
    }
    messages.push({ role: "assistant", content: raw });
    messages.push({ role: "user", content: repairPrompt(errors) });
  }

  const firstAttemptValid = attempts[0]?.valid === true;
  const fuelSpent = attempts.length;
  const report = attempts.map((a) => ({ attempt: a.attempt, valid: a.valid, errors: a.errors ?? [] }));

  if (draft) {
    let path;
    if (DRAFT_DIR) {
      const dir = resolve(DRAFT_DIR);
      mkdirSync(dir, { recursive: true });
      path = join(dir, `${draft.id}.json`);
      writeFileSync(path, JSON.stringify(draft, null, 2) + "\n");
    }
    out({
      ok: true,
      draft,
      ...(path ? { path } : {}),
      model: MODEL,
      fuel: { cap: FUEL, spent: fuelSpent },
      "first-attempt-valid": firstAttemptValid,
      "post-repair-valid": true,
      attempts: report,
    });
  }

  out(
    {
      ok: false,
      refusal: true,
      request,
      model: MODEL,
      fuel: { cap: FUEL, spent: fuelSpent },
      "first-attempt-valid": firstAttemptValid,
      "post-repair-valid": false,
      attempts: report,
    },
    1,
  );
}

await run();
