export class Aggregator {
    /**
     *
     * @param {Configuration} configuration - The global configuration for this package.
     */
    constructor(configuration) {
        this.configuration = configuration
        this.source = configuration.source
    }

    async run() {
        return this.source.fetch()
    }
}
