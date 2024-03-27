import type { GitHubWorkflow } from "./GitHubWorkflow";

export interface APIClient {
	getWorkflow(
		owner: string,
		repo: string,
		path: string,
	): Promise<GitHubWorkflow>;
}
