import type { Aggregator } from "./Aggregator";
import { GitHubAggregator } from "./GitHubAggregator";

export type ConfigurationInput =
	| {
			source: "github";
			githubToken: string;
			owner: string;
			repo: string;
			workflowId: string;
	  }
	| {
			source: "memory"; // TODO
	  };

export class Configuration {
	readonly aggregator: Aggregator;

	/**
	 *
	 * @param {ConfigurationInput} params - Configuration Input
	 */
	constructor(params: ConfigurationInput) {
		this.aggregator = this.setAggregator(params);
	}

	private setAggregator(params: ConfigurationInput): Aggregator {
		switch (params.source) {
			case "github":
				return new GitHubAggregator(params);
			default:
				throw new Error(`Unsupported source: ${params.source}`);
		}
	}
}
