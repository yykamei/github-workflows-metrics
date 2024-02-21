import {GitHubSource} from "./GitHubSource.mjs";

export class Configuration {
    /**
     *
     * @param params - An object
     */
    constructor(params) {
        this.params = params
        this._source = null
    }

    get source() {
        if (!this._source) {
            switch (this.params.source) {
                case "github":
                default: {
                    this._source = new GitHubSource()
                    break
                }
            }
        }
        return this._source
    }
}
