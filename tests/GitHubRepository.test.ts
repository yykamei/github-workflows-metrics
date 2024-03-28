import { describe, it } from "vitest";
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
		repository.createIssue(new GitHubIssueContent([], "title"));
	});
});
