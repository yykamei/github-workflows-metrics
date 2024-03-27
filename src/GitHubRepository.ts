import type { APIClient, IssueBody } from "./APIClient";
import type { GitHubIssue } from "./GitHubIssue";
import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";

export class GitHubRepository {
	constructor(
		private readonly owner: string,
		private readonly repo: string,
		private readonly apiClient: APIClient,
	) {}

	async getWorkflows(): Promise<GitHubWorkflow[]> {
		return this.apiClient.getWorkflows(this.owner, this.repo);
	}

	async getWorkflow(path: string): Promise<GitHubWorkflow> {
		return this.apiClient.getWorkflow(this.owner, this.repo, path);
	}

	async getWorkflowRuns(
		workflow: GitHubWorkflow,
	): Promise<GitHubWorkflowRun[]> {
		return this.apiClient.getWorkflowRuns(this.owner, this.repo, workflow.id);
	}

	async createIssue(issueBody: IssueBody): Promise<GitHubIssue> {
		return this.apiClient.createIssue(this.owner, this.repo, issueBody);
	}
}
