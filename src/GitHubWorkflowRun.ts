import type { DateTime } from "./DateTime";
import type { Duration } from "./Duration";

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
	readonly runStartedAt?: DateTime;
};

export class GitHubWorkflowRun {
	constructor(public readonly parameters: GitHubWorkflowRunParameters) {}

	get duration(): Duration {
		return this.parameters.updatedAt.minus(
			this.parameters.runStartedAt || this.parameters.createdAt,
		);
	}

	get date(): Date {
		return new Date(this.parameters.createdAt.value);
	}
}
