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

	/**
	 * Checks if the workflow run is outlier or not.
	 * Currently, it marks itself as outlier when duration of the workflow run is more than 6 hours.
	 *
	 * @returns {boolean} Returns true if the duration is more than 6 hours, otherwise false.
	 */
	get isOutlier(): boolean {
		return this.duration.toSeconds() > 60 * 60 * 6;
	}

	get date(): Date {
		return new Date(this.parameters.createdAt.value);
	}
}
