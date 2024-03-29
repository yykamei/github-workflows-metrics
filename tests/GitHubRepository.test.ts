import { describe, expect, it } from "vitest";
import { DateTime } from "../src/DateTime";
import { GitHubIssue } from "../src/GitHubIssue";
import { GitHubIssueContent } from "../src/GitHubIssueContent";
import { GitHubRepository } from "../src/GitHubRepository";
import { GitHubWorkflow } from "../src/GitHubWorkflow";
import { GitHubWorkflowRun } from "../src/GitHubWorkflowRun";
import { TestClient } from "../src/TestClient";

describe("GitHubRepository", () => {
	it("should call functions declared in APIClient", async () => {
		const client = new TestClient();
		const repository = new GitHubRepository("owner", "repo", client);
		await repository.getWorkflows();
		await repository.getWorkflow("abc.yml");
		await repository.getWorkflowRuns(
			new GitHubWorkflow(8, "Eight", "eight.yml"),
		);
		await repository.getWorkflowRunUsage(
			new GitHubWorkflowRun({
				conclusion: "c",
				createdAt: new DateTime("2024-02-26T08:59:49Z"),
				updatedAt: new DateTime("2024-02-26T08:59:49Z"),
				displayTitle: "",
				event: "",
				id: 1,
				name: null,
				path: "",
				runNumber: 0,
				workflowId: 10,
			}),
		);
		await repository.getIssues([]);
		await repository.createIssue(new GitHubIssueContent([], "title"));
		await repository.closeIssue(
			new GitHubIssue({
				id: 1,
				number: 1,
				body: "b",
				url: "url",
				title: "t",
				state: "open",
			}),
		);
	});

	it("should filter workflows with only", async () => {
		const client = new TestClient();
		const repository = new GitHubRepository("owner", "repo", client);
		const workflows = await repository.getWorkflows(["xyz.yml"]);
		expect(workflows.length).toEqual(1);
		expect(workflows.map((w) => w.path)).toEqual(["xyz.yml"]);
	});
});
