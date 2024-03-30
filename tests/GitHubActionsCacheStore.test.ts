import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GitHubActionsCacheStore } from "../src/GitHubActionsCacheStore";

describe("GitHubActionsCacheStore", () => {
	let workdir: string;

	beforeEach(async () => {
		workdir = await mkdtemp(tmpdir());
	});

	afterEach(async () => {
		vi.restoreAllMocks();
		await rm(workdir, { recursive: true, force: true });
	});

	describe("setup()", () => {
		it("should setup", async () => {
			const restore = vi.fn();
			const store = new GitHubActionsCacheStore(workdir, restore);
			await store.setup();
			expect(restore).toHaveBeenCalledWith(
				[workdir],
				"github-workflow-metrics",
			);
		});
	});

	describe("read()", () => {
		it("should return nil if cache is missing", async () => {
			const store = new GitHubActionsCacheStore(workdir);
			const cache = await store.read("key");
			expect(cache).toBeNull();
		});

		it("should return cache if cache exists", async () => {
			await mkdir(join(workdir, "key"), { recursive: true });
			await writeFile(join(workdir, "key", "etag"), "etag1");
			await writeFile(
				join(workdir, "key", "data"),
				JSON.stringify({ field: 1 }),
			);
			const store = new GitHubActionsCacheStore(workdir);
			const cache = await store.read("key");
			expect(cache).toEqual({ etag: "etag1", data: { field: 1 } });
		});
	});

	describe("write()", () => {
		it("should write cache", async () => {
			const store = new GitHubActionsCacheStore(workdir);
			await store.write("key", { etag: "e", data: { my: "field" } });
			const etag = await readFile(join(workdir, "key", "etag"), "utf-8");
			const data = await readFile(join(workdir, "key", "data"), "utf-8");
			expect(etag).toEqual("e");
			expect(JSON.parse(data)).toEqual({ my: "field" });
		});
	});

	describe("settle()", () => {
		it("should settle", async () => {
			const restore = vi.fn();
			const save = vi.fn();
			const store = new GitHubActionsCacheStore(workdir, restore, save);
			await store.settle();
			expect(save).toHaveBeenCalledWith([workdir], "github-workflow-metrics");
		});
	});
});
