import { getOctokit } from "@actions/github";

import { Source } from "./Source";

export class GitHubSource implements Source {
	constructor(private githubToken: string) {}

	async fetch() {
		const octokit = getOctokit(this.githubToken);
		octokit.graphql; // TODO
	}
}
