import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GitHubActionsCacheStore } from "../src/GitHubActionsCacheStore";

describe("GitHubActionsCacheStore", () => {
	let workdir: string;

	beforeEach(async () => {
		workdir = await mkdtemp(join(tmpdir(), "gwm-"));
	});

	afterEach(async () => {
		vi.restoreAllMocks();
		await rm(workdir, { recursive: true, force: true });
	});

	describe("read()", () => {
		it("should return nil if cache is missing", async () => {
			const restore = vi.fn();
			const store = new GitHubActionsCacheStore(workdir, restore);
			const cache = await store.read("key");
			expect(cache).toBeNull();
			expect(restore).toHaveBeenCalledWith([workdir], "key");
		});

		it("should return cache if cache exists", async () => {
			const restore = vi.fn();
			await mkdir(join(workdir, "key"), { recursive: true });
			await writeFile(join(workdir, "key", "etag"), "etag1");
			await writeFile(
				join(workdir, "key", "data"),
				JSON.stringify({ field: 1 }),
			);
			const store = new GitHubActionsCacheStore(workdir, restore);
			const cache = await store.read("key");
			expect(cache).toEqual({ etag: "etag1", data: { field: 1 } });
			expect(restore).toHaveBeenCalledWith([workdir], "key");
		});
	});

	describe("write()", () => {
		it("should write cache", async () => {
			const restore = vi.fn();
			const save = vi.fn();
			const store = new GitHubActionsCacheStore(workdir, restore, save);
			await store.write("key", { etag: "e", data: { my: "field" } });
			const etag = await readFile(join(workdir, "key", "etag"), "utf-8");
			const data = await readFile(join(workdir, "key", "data"), "utf-8");
			expect(etag).toEqual("e");
			expect(JSON.parse(data)).toEqual({ my: "field" });
			expect(save).toHaveBeenCalledWith([workdir], "key");
		});
	});
});
