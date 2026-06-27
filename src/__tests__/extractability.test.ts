import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// @bounded-systems/repo-root is the ONE sanctioned root-resolution point. Prod
// files touch node:fs (the `.git`-marker walk) + node:path, and shell out only
// through @bounded-systems/proc — never raw child_process. The harness now also
// enforces that no-ambient intent (the old test only checked imports).
test("@bounded-systems/repo-root upholds its seam claim", () => {
  assertSeam({
    root: SRC,
    prod: ["node:fs", "node:path", "@bounded-systems/proc"],
    test: ["@bounded-systems/repo-root", "@bounded-systems/seam-check"],
  });
});
