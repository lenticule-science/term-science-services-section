import assert from "node:assert/strict";
import test from "node:test";
import { invokeTermOperation, termOperationImplementations } from "../src/term-operations.mjs";

test("the service resolves both full legacy implementations from its owning Board tree", () => {
  assert.match(termOperationImplementations["recall-term"], /recalling-a-term\/scripts\/recall-a-term\.js$/u);
  assert.match(termOperationImplementations["write-term"], /writing-a-term\/scripts\/write-a-term\.js$/u);
});

test("the service preserves the implementation exit and structured output", () => {
  const result = invokeTermOperation({ operation: "recall-term", args: ["term", "--json"] }, { run: (_command, args) => ({ status: 0, signal: null, stdout: JSON.stringify({ args }), stderr: "" }) });
  assert.equal(result.disposition, "completed");
  assert.equal(result.value.args.at(-1), "--json");
});
