import type { GitHubIssue } from "./GitHubIssue";
import type { GitHubIssueContent } from "./GitHubIssueContent";
import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";
import type { RangeString } from "./Input";
import type { Usage } from "./Usage";

export type WorkflowStatus =
	| "queued"
	| "in_progress"
	| "completed"
	| "action_required"
	| "cancelled"
	| "failure"
	| "neutral"
	| "skipped"
	| "stale"
	| "success"
	| "timed_out"
	| "requested"
	| "waiting"
	| "pending";

export type GetWorkflowRunsOptions = {
	readonly excludePullRequests?: boolean;
	readonly status?: WorkflowStatus;
	readonly created?: RangeString;
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
		options?: GetWorkflowRunsOptions,
	): Promise<GitHubWorkflowRun[]>;
	getWorkflowRunUsage(
		owner: string,
		repo: string,
		runId: number,
	): Promise<Usage>;
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
