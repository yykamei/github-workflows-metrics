import { context } from "@actions/github";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Input } from "../src/Input";

describe("Input", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should return inputs", () => {
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn((key: string) => {
			switch (key) {
				case "token":
					return "my-token";
				case "label":
					return "github-workflows-metrics";
				case "only":
					return "";
				case "status":
					return "failure";
				case "range":
					return "30days";
				case "aggregate":
					return "median";
				default:
					throw new Error("Unsupported key");
			}
		});
		const input = new Input(context, getInput);
		expect(input.owner).toEqual("yykamei");
		expect(input.repo).toEqual("test-repo");
		expect(input.label).toEqual("github-workflows-metrics");
		expect(input.only).toBeNull();
		expect(input.status).toEqual("failure");
		expect(input.range).toEqual("30days");
		expect(input.aggregate).toEqual("median");
		expect(input.token).toEqual("my-token");
	});

	it("should return an Array for only when specified", () => {
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn((key: string) => {
			switch (key) {
				case "only":
					return "a.yml   , b.yml,c.yml";
				default:
					throw new Error("Unsupported key");
			}
		});
		const input = new Input(context, getInput);
		expect(input.only).toEqual(["a.yml", "b.yml", "c.yml"]);
	});

	it("should validate status input", () => {
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const validValues = [
			"completed",
			"action_required",
			"cancelled",
			"failure",
			"neutral",
			"skipped",
			"stale",
			"success",
			"timed_out",
			"in_progress",
			"queued",
			"requested",
			"waiting",
			"pending",
		];
		for (const v of validValues) {
			const getInput = vi.fn(() => v);
			const input = new Input(context, getInput);
			expect(input.status).toEqual(v);
		}
		const getInput = vi.fn(() => "unknown");
		const input = new Input(context, getInput);
		expect(input.status).toBeUndefined();
	});

	it("should throw an error with the unsupported range", () => {
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn(() => "unknown");
		const input = new Input(context, getInput);
		expect(() => input.range).toThrowError;
	});

	it("should throw an error with the unsupported aggregate", () => {
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn(() => "unknown");
		const input = new Input(context, getInput);
		expect(() => input.aggregate).toThrowError;
	});
});
