import { getOctokit } from "@actions/github";
import type { Octokit } from "@octokit/core";
import type { APIClient } from "./APIClient";
import { GitHubWorkflow } from "./GitHubWorkflow";

export class GitHubAPIClient implements APIClient {
	public readonly client: Octokit;

	constructor(token: string) {
		this.client = getOctokit(token);
	}

	async getWorkflow(
		owner: string,
		repo: string,
		path: string,
	): Promise<GitHubWorkflow> {
		const response = await this.client.request(
			"GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}",
			{
				owner,
				repo,
				workflow_id: path,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);
		const { id, name } = response.data;
		return new GitHubWorkflow(id, name, path);
	}
}
