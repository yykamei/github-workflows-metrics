import { describe, expect, it } from "vitest";
import { GitHubWorkflow } from "../src/GitHubWorkflow";

describe("GitHubWorkflow", () => {
	it("should initialize", () => {
		const workflow = new GitHubWorkflow(123, "A", "a.yml");
		expect(workflow.id).toEqual(123);
		expect(workflow.name).toEqual("A");
		expect(workflow.path).toEqual("a.yml");
	});
});
