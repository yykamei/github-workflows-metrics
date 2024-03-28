import { describe, it } from "vitest";
import { GitHubIssue } from "../src/GitHubIssue";
import { GitHubIssueContent } from "../src/GitHubIssueContent";
import { GitHubRepository } from "../src/GitHubRepository";
import { GitHubWorkflow } from "../src/GitHubWorkflow";
import { TestClient } from "../src/TestClient";

describe("GitHubRepository", () => {
	it("should call functions declared in APIClient", () => {
		const client = new TestClient();
		const repository = new GitHubRepository("owner", "repo", client);
		repository.getWorkflows();
		repository.getWorkflow("abc.yml");
		repository.getWorkflowRuns(new GitHubWorkflow(8, "Eight", "eight.yml"));
		repository.getIssues([]);
		repository.createIssue(new GitHubIssueContent([], "title"));
		repository.closeIssue(
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
});
