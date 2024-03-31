import { debug } from "@actions/core";
import { getOctokit } from "@actions/github";
import type { Octokit } from "@octokit/core";
import type { APIClient, GetWorkflowRunsOptions } from "./APIClient";
import { DateTime } from "./DateTime";
import { Duration } from "./Duration";
import { GitHubIssue } from "./GitHubIssue";
import type { GitHubIssueContent } from "./GitHubIssueContent";
import { GitHubWorkflow } from "./GitHubWorkflow";
import { GitHubWorkflowRun } from "./GitHubWorkflowRun";
import { Usage } from "./Usage";

const GITHUB_LINK_REL_REXT = 'rel="next"';

export class GitHubAPIClient implements APIClient {
	public readonly client: Octokit;

	constructor(token: string) {
		this.client = getOctokit(token);

		this.client.hook.after("request", async (response) => {
			const rateLimit = response.headers["x-ratelimit-limit"];
			const rateLimitRemaining = response.headers["x-ratelimit-remaining"];
			const rateLimitReset = response.headers["x-ratelimit-reset"];
			debug(
				`Rate limit: Limit=${rateLimit}, Remaining=${rateLimitRemaining}, Reset=${rateLimitReset} on ${response.url}`,
			);
		});
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
		let page = 1;
		let link = "";
		let workflows: GitHubWorkflow[] = [];
		while (page === 1 || link.includes(GITHUB_LINK_REL_REXT)) {
			debug(`Fetching workflows page ${page}`);
			const response = await this.client.request(
				"GET /repos/{owner}/{repo}/actions/workflows",
				{
					owner,
					repo,
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
					per_page: 100,
					page,
				},
			);
			link = response.headers.link || "";
			page += 1;
			workflows = [
				...workflows,
				...response.data.workflows.map(
					(w) => new GitHubWorkflow(w.id, w.name, w.path),
				),
			];
		}
		return workflows;
	}

	async getWorkflowRuns(
		owner: string,
		repo: string,
		workflowId: number,
		options?: GetWorkflowRunsOptions,
	): Promise<GitHubWorkflowRun[]> {
		let page = 1;
		let link = "";
		let runs: GitHubWorkflowRun[] = [];
		while (page === 1 || (page <= 10 && link.includes(GITHUB_LINK_REL_REXT))) {
			debug(`Fetching runs page ${page}`);
			const response = await this.client.request(
				"GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
				{
					owner,
					repo,
					workflow_id: workflowId,
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
					per_page: 100,
					page,
					exclude_pull_requests: options?.excludePullRequests,
					status: options?.status,
				},
			);
			link = response.headers.link || "";
			page += 1;
			runs = [
				...runs,
				...response.data.workflow_runs.map(
					(r) =>
						new GitHubWorkflowRun({
							...r,
							name: r.name ?? null,
							workflowId: r.workflow_id,
							runNumber: r.run_number,
							displayTitle: r.display_title,
							createdAt: new DateTime(r.created_at),
							updatedAt: new DateTime(r.updated_at),
							runStartedAt: r.run_started_at
								? new DateTime(r.run_started_at)
								: undefined,
						}),
				),
			];
		}
		return runs;
	}

	async getWorkflowRunUsage(
		owner: string,
		repo: string,
		runId: number,
	): Promise<Usage> {
		const response = await this.client.request(
			"GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing",
			{
				owner,
				repo,
				run_id: runId,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);
		const durationMs = response.data.run_duration_ms;
		return new Usage(runId, durationMs ? new Duration(durationMs) : null);
	}

	async getIssues(
		owner: string,
		repo: string,
		labels: string[],
	): Promise<GitHubIssue[]> {
		const response = await this.client.request(
			"GET /repos/{owner}/{repo}/issues",
			{
				owner,
				repo,
				labels: labels.join(","),
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);
		return response.data.map((d) => {
			return new GitHubIssue({ ...d, body: d.body ?? "" });
		});
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
	async closeIssue(
		owner: string,
		repo: string,
		issue: GitHubIssue,
	): Promise<GitHubIssue> {
		const response = await this.client.request(
			"PATCH /repos/{owner}/{repo}/issues/{issue_number}",
			{
				owner,
				repo,
				issue_number: issue.parameters.number,
				state: "closed",
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
