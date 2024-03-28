import type { APIClient } from "./APIClient";
import { DateTime } from "./DateTime";
import { GitHubIssue } from "./GitHubIssue";
import type { GitHubIssueContent } from "./GitHubIssueContent";
import { GitHubWorkflow } from "./GitHubWorkflow";
import { GitHubWorkflowRun } from "./GitHubWorkflowRun";

export class TestClient implements APIClient {
	async getWorkflows(_owner: string, _repo: string): Promise<GitHubWorkflow[]> {
		return [new GitHubWorkflow(1234, "My Workflow", "my_workflow.yml")];
	}
	async getWorkflow(
		_owner: string,
		_repo: string,
		path: string,
	): Promise<GitHubWorkflow> {
		return new GitHubWorkflow(1234, "My Workflow", path);
	}

	async getWorkflowRuns(
		_owner: string,
		_repo: string,
		workflowId: number,
	): Promise<GitHubWorkflowRun[]> {
		return [
			new GitHubWorkflowRun({
				id: 123,
				runNumber: 3,
				name: null,
				displayTitle: "abc",
				path: "abc.yml",
				event: "push",
				conclusion: "failure",
				workflowId,
				createdAt: new DateTime("2024-02-26T08:59:49Z"),
				updatedAt: new DateTime("2024-02-26T08:59:49Z"),
			}),
		];
	}
	async createIssue(
		_owner: string,
		_repo: string,
		_issueContent: GitHubIssueContent,
	): Promise<GitHubIssue> {
		return new GitHubIssue({
			id: 234,
			url: "https://github.com/yykamei/test-repo/issue/234",
			number: 2340,
			state: "open",
			title: "test",
			body: "body",
		});
	}
}
