import { GitHubAPIClient } from "./GitHubAPIClient";
import { GitHubActionsCacheStore } from "./GitHubActionsCacheStore";
import { GitHubIssueContent } from "./GitHubIssueContent";
import { GitHubRepository } from "./GitHubRepository";
import { Input } from "./Input";
import { MermaidXYChart } from "./MermaidXYChart";

const main = async () => {
	const now = new Date();
	const input = new Input();
	const cacheStore = new GitHubActionsCacheStore();
	await cacheStore.setup();

	try {
		const apiClient = new GitHubAPIClient(input.token, cacheStore);
		const repository = new GitHubRepository(input.owner, input.repo, apiClient);
		const workflows = await repository.getWorkflows(input.only);
		const charts = await Promise.all(
			workflows.map(async (w) => {
				const runs = await repository.getWorkflowRuns(w, {
					status: input.status,
				});
				const usages = await Promise.all(
					runs.map((r) => repository.getWorkflowRunUsage(r)),
				);
				return new MermaidXYChart(w, runs, usages, input);
			}),
		);
		const issueContent = new GitHubIssueContent(
			charts,
			`GitHub Workflow Metrics on ${now.toDateString()}`,
			[],
			[input.label],
		);
		for (const issue of await repository.getIssues([input.label])) {
			await repository.closeIssue(issue);
		}
		await repository.createIssue(issueContent);
	} finally {
		await cacheStore.settle();
	}
};

export default main;
