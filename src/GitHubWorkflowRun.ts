import type { DateTime } from "./DateTime";

type GitHubWorkflowRunParameters = {
	readonly id: number;
	readonly runNumber: number;
	readonly name: string | null;
	readonly displayTitle: string;
	readonly path: string;
	readonly event: string;
	readonly conclusion: string | null;
	readonly workflowId: number;
	readonly createdAt: DateTime;
	readonly updatedAt: DateTime;
};

export class GitHubWorkflowRun {
	constructor(public readonly parameters: GitHubWorkflowRunParameters) {}
}
