import { describe, expect, it } from "vitest";
import { DateTime } from "../src/DateTime";
import { GitHubWorkflowRun } from "../src/GitHubWorkflowRun";

describe("GitHubWorkflowRun", () => {
	it("should initialize", () => {
		const run = new GitHubWorkflowRun({
			id: 123,
			runNumber: 3,
			name: null,
			displayTitle: "abc",
			path: "abc.yml",
			event: "push",
			conclusion: "failure",
			workflowId: 88,
			createdAt: new DateTime("2024-02-26T08:59:49Z"),
			updatedAt: new DateTime("2024-02-26T08:59:49Z"),
		});
		expect(run).toHaveProperty("parameters");
	});
});
