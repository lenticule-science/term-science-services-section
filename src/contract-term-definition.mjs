import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const ACTOR = "urn:ame:term-services";
export const CONTEXT = "https://www.w3.org/ns/activitystreams";
const HERE = dirname(fileURLToPath(import.meta.url));
const RECALL = resolve(HERE, "../../../../../../../lib/management/skills/recalling-a-term/scripts/recall-a-term.js");
function response(activity, instant, type, code, summary, object) { return Object.freeze({ "@context": CONTEXT, type, actor: ACTOR, target: activity?.actor, published: instant, code, summary, object }); }
function demandFrom(activity) { const source = activity?.object?.offer?.object?.sourceActivity; const demand = source?.object; return source?.type === "Create" && demand?.type === "GlossaryTermDefinitionDemand" ? demand : null; }
function inspectDemand(demand) {
  if (typeof demand?.term !== "string" || demand.term.trim() === "" || demand.term.length > 240) return "one bounded nonempty term is required";
  if (demand.from !== undefined && (typeof demand.from !== "string" || demand.from.trim() === "" || !existsSync(resolve(demand.from)))) return "asking point must be an existing local path when supplied";
  return null;
}
export function solicitTermDefinition(demand, instant = new Date().toISOString()) { return Object.freeze({ "@context": CONTEXT, type: "Offer", actor: ACTOR, target: ACTOR, published: instant, object: { type: "ServiceSolicitation", sourceActivity: { "@context": CONTEXT, type: "Create", actor: ACTOR, object: demand } } }); }
export function invokeTermDefinition(activity, instant = new Date().toISOString()) {
  const demand = demandFrom(activity); if (demand === null) return response(activity, instant, "Reject", "invalid-contract", "term services require a GlossaryTermDefinitionDemand", activity);
  const defect = inspectDemand(demand); if (defect !== null) return response(activity, instant, "Reject", "invalid-demand", defect, demand);
  const result = spawnSync(process.execPath, [RECALL, demand.term.trim(), "--json", ...(demand.from === undefined ? [] : ["--from", resolve(demand.from)])], { encoding: "utf8" });
  if (result.error || result.status !== 0) return response(activity, instant, "Reject", "term-not-defined", (result.stderr || result.error?.message || "term lookup failed").trim(), demand);
  let definition; try { definition = JSON.parse(result.stdout); } catch { return response(activity, instant, "Reject", "invalid-provider-output", "term resolver did not return JSON", demand); }
  return response(activity, instant, "Accept", "term-defined", "nearest glossary definition returned from the declared asking point", { type: "GlossaryTermDefinitionDelivery", demand, definition, provider: ACTOR, deliveredAt: instant, consideration: { status: "not-observed", reason: "this direct bilateral contract contains no provider-authored monetary offer" } });
}
