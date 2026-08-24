/// <reference types="vite/client" />

import { describe, expect, it } from "vitest";

const entryPoints = import.meta.glob<{ default: unknown }>(
	"../../extensions/*/index.ts",
);

describe("package extension entry points", () => {
	it("discovers extension factories", () => {
		expect(Object.keys(entryPoints).length).toBeGreaterThan(0);
	});

	for (const [path, load] of Object.entries(entryPoints)) {
		it(`loads ${path}`, async () => {
			const module = await load();
			expect(module.default).toBeTypeOf("function");
		});
	}
});
