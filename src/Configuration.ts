import { Source } from "./Source";
import { GitHubSource } from "./GitHubSource";

export type ConfigurationInput = {
	source: string;
};

export class Configuration {
	readonly source: Source;
	/**
	 *
	 * @param {ConfigurationInput} params - Configuration Input
	 */
	constructor(params: ConfigurationInput) {
		this.source = setSource(params.source);
	}
}

const setSource = (_input: string): Source => {
	// TODO: Support other sources.
	return new GitHubSource();
};
