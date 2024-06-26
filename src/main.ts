import { GitHubAPIClient } from "./GitHubAPIClient";
import { GitHubIssueContent } from "./GitHubIssueContent";
import { GitHubRepository } from "./GitHubRepository";
import { Input } from "./Input";
import { MermaidXYChart } from "./MermaidXYChart";

const main = async () => {
	const now = new Date();
	const input = new Input();
	const apiClient = new GitHubAPIClient(input.token);
	const repository = new GitHubRepository(input.owner, input.repo, apiClient);
	const workflows = await repository.getWorkflows(input.only);
	const charts = await Promise.all(
		workflows.map(async (w) => {
			const runs = await repository.getWorkflowRuns(w, {
				status: input.status,
				created: input.range,
			});
			return new MermaidXYChart(w, runs, input);
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
};

export default main;
