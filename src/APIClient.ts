import type { GitHubIssue } from "./GitHubIssue";
import type { GitHubIssueContent } from "./GitHubIssueContent";
import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";

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
	getIssues(
		owner: string,
		repo: string,
		labels: string[],
	): Promise<GitHubIssue[]>;
	createIssue(
		owner: string,
		repo: string,
		issueContent: GitHubIssueContent,
	): Promise<GitHubIssue>;
	closeIssue(
		owner: string,
		repo: string,
		issue: GitHubIssue,
	): Promise<GitHubIssue>;
}
