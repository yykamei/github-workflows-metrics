import type { GitHubIssue } from "./GitHubIssue";
import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";

export type IssueBody = {
	readonly title: string;
	readonly body: string;
	readonly assignees?: string[];
	readonly labels?: string[];
};
export interface APIClient {
	getWorkflows(owner: string, repo: string): Promise<GitHubWorkflow[]>;
	getWorkflow(
		owner: string,
		repo: string,
		path: string,
	): Promise<GitHubWorkflow>;
	getWorkflowRuns(
		owner: string,
		repo: string,
		workflowId: number,
	): Promise<GitHubWorkflowRun[]>;

	createIssue(
		owner: string,
		repo: string,
		issueBody: IssueBody,
	): Promise<GitHubIssue>;
}
