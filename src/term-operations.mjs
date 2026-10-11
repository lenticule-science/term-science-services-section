import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const RECALL_IMPLEMENTATION = fileURLToPath(new URL("../../../../../../../lib/management/skills/recalling-a-term/scripts/recall-a-term.js", import.meta.url));
const WRITE_IMPLEMENTATION = fileURLToPath(new URL("../../../../../../../lib/management/skills/writing-a-term/scripts/write-a-term.js", import.meta.url));

function strings(value, label) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) throw new TypeError(`${label} must be an array of strings`);
  return value;
}

export function invokeTermOperation(input, options = {}) {
  if (!input || !["recall-term", "write-term"].includes(input.operation)) throw new TypeError("operation must be recall-term or write-term");
  const args = strings(input.args ?? [], "args");
  const implementation = input.operation === "recall-term" ? (options.recallImplementation ?? RECALL_IMPLEMENTATION) : (options.writeImplementation ?? WRITE_IMPLEMENTATION);
  const run = options.run ?? spawnSync;
  const result = run(process.execPath, [implementation, ...args], {
    cwd: input.cwd,
    input: input.stdin ?? undefined,
    encoding: "utf8",
    maxBuffer: input.maxBuffer ?? 128 * 1024 * 1024,
  });
  const stdout = result.stdout ?? "", stderr = result.stderr ?? "";
  let value = null; try { value = JSON.parse(stdout); } catch { /* many valid term operations intentionally return prose */ }
  return Object.freeze({
    type: "TermOperationResultK", operation: input.operation, implementation,
    status: result.status, signal: result.signal ?? null, stdout, stderr, value,
    disposition: result.status === 0 ? "completed" : "refused-or-failed",
  });
}

export const termOperationImplementations = Object.freeze({
  "recall-term": RECALL_IMPLEMENTATION,
  "write-term": WRITE_IMPLEMENTATION,
});
