import { Configuration } from "./Configuration";
import type { Source } from "./Source";

export class Aggregator {
	private source: Source;
	/**
	 *
	 * @param {Configuration} configuration - The global configuration for this package.
	 */
	constructor(configuration: Configuration) {
		this.source = configuration.source;
	}

	async run() {
		return this.source.fetch();
	}
}
