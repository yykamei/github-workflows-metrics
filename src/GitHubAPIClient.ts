import { getOctokit } from "@actions/github";
import type { Octokit } from "@octokit/core";
import type { APIClient } from "./APIClient";
import { DateTime } from "./DateTime";
import { GitHubIssue } from "./GitHubIssue";
import type { GitHubIssueContent } from "./GitHubIssueContent";
import { GitHubWorkflow } from "./GitHubWorkflow";
import { GitHubWorkflowRun } from "./GitHubWorkflowRun";

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

	async getWorkflows(owner: string, repo: string): Promise<GitHubWorkflow[]> {
		const response = await this.client.request(
			"GET /repos/{owner}/{repo}/actions/workflows",
			{
				owner,
				repo,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);
		return response.data.workflows.map(
			(w) => new GitHubWorkflow(w.id, w.name, w.path),
		);
	}

	async getWorkflowRuns(
		owner: string,
		repo: string,
		workflowId: number,
	): Promise<GitHubWorkflowRun[]> {
		const response = await this.client.request(
			"GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
			{
				owner,
				repo,
				workflow_id: workflowId,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);
		return response.data.workflow_runs.map(
			(r) =>
				new GitHubWorkflowRun({
					...r,
					name: r.name ?? null,
					workflowId: r.workflow_id,
					runNumber: r.run_number,
					displayTitle: r.display_title,
					createdAt: new DateTime(r.created_at),
					updatedAt: new DateTime(r.updated_at),
				}),
		);
	}

	async createIssue(
		owner: string,
		repo: string,
		issueContent: GitHubIssueContent,
	): Promise<GitHubIssue> {
		const { title, body, assignees, labels } = issueContent;
		const response = await this.client.request(
			"POST /repos/{owner}/{repo}/issues",
			{
				owner,
				repo,
				title,
				body,
				assignees,
				labels,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);
		return new GitHubIssue({
			...response.data,
			body: response.data.body ?? "",
		});
	}
}
