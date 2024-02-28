import { getOctokit } from "@actions/github";

import { Aggregator } from "./Aggregator";

type Params = {
	githubToken: string;
	owner: string;
	repo: string;
	workflowId: string;
};

export class GitHubAggregator implements Aggregator {
	private readonly githubToken: string;
	private readonly owner: string;
	private readonly repo: string;
	private readonly workflowId: string;

	constructor({ githubToken, owner, repo, workflowId }: Params) {
		this.githubToken = githubToken;
		this.owner = owner;
		this.repo = repo;
		this.workflowId = workflowId;
	}

	async fetch() {
		const octokit = getOctokit(this.githubToken);
		let page = 1;
		let hasNextPage = true;
		while (hasNextPage) {
			const response = await octokit.request(
				"GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
				{
					owner: this.owner,
					repo: this.repo,
					workflow_id: this.workflowId,
					page,
					per_page: 100,
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
				},
			);
			console.log(response.data.workflow_runs);
			// Process the result here
			// ...

			const linkHeader = response.headers.link;
			hasNextPage = linkHeader?.includes(`rel=\"next\"`) || false;
			page++;
		}
	}
}
