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
	const workflows = await repository.getWorkflows();
	const charts = await Promise.all(
		workflows.map(async (w) => {
			const runs = await repository.getWorkflowRuns(w);
			return new MermaidXYChart(w, runs);
		}),
	);
	const issueContent = new GitHubIssueContent(
		charts,
		`GitHub Workflow Metrics on ${now.toDateString()}`,
		[],
		[input.label],
	);
	await repository.createIssue(issueContent);
};

export default main;
