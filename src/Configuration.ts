import { GitHubSource } from "./GitHubSource";
import type { Source } from "./Source";

export type ConfigurationInput = {
	source: string;
	githubToken: string;
};

export class Configuration {
	readonly source: Source;
	readonly githubToken: string;

	/**
	 *
	 * @param {ConfigurationInput} params - Configuration Input
	 */
	constructor(params: ConfigurationInput) {
		this.githubToken = params.githubToken;
		this.source = this.setSource(params.source);
	}

	private setSource(source: string): Source {
		switch (source) {
			case "github":
				return new GitHubSource(this.githubToken);
			default:
				throw new Error(`Unsupported source: ${source}`);
		}
	}
}
