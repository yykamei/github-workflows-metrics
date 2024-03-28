import type { APIClient } from "./APIClient";
import type { GitHubIssue } from "./GitHubIssue";
import type { GitHubIssueContent } from "./GitHubIssueContent";
import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";

export class GitHubRepository {
	constructor(
		private readonly owner: string,
		private readonly repo: string,
		private readonly apiClient: APIClient,
	) {}

	async getWorkflows(only?: string[] | null): Promise<GitHubWorkflow[]> {
		const workflows = await this.apiClient.getWorkflows(this.owner, this.repo);
		if (only) {
			return workflows.filter((w) => {
				return only.some((o) => w.path.endsWith(o));
			});
		}
		return workflows;
	}

	async getWorkflow(path: string): Promise<GitHubWorkflow> {
		return this.apiClient.getWorkflow(this.owner, this.repo, path);
	}

	async getWorkflowRuns(
		workflow: GitHubWorkflow,
	): Promise<GitHubWorkflowRun[]> {
		return this.apiClient.getWorkflowRuns(this.owner, this.repo, workflow.id);
	}

	async getIssues(labels: string[]): Promise<GitHubIssue[]> {
		return this.apiClient.getIssues(this.owner, this.repo, labels);
	}

	async createIssue(issueContent: GitHubIssueContent): Promise<GitHubIssue> {
		return this.apiClient.createIssue(this.owner, this.repo, issueContent);
	}

	async closeIssue(issue: GitHubIssue): Promise<GitHubIssue> {
		return this.apiClient.closeIssue(this.owner, this.repo, issue);
	}
}
