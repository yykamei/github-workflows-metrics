import { Context } from "@actions/github/lib/context";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Input } from "../src/Input";

describe("Input", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should return inputs", () => {
		const context = new Context();
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
				default:
					throw new Error("Unsupported key");
			}
		});
		const input = new Input(context, getInput);
		expect(input.owner).toEqual("yykamei");
		expect(input.repo).toEqual("test-repo");
		expect(input.label).toEqual("github-workflows-metrics");
		expect(input.token).toEqual("my-token");
	});
});
