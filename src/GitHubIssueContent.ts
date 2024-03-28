import type { MermaidXYChart } from "./MermaidXYChart";

export class GitHubIssueContent {
	constructor(
		private readonly charts: MermaidXYChart[],
		public readonly title: string,
		public readonly assignees?: string[],
		public readonly labels?: string[],
	) {}

	get body(): string {
		const chunks = this.charts.map((c) => {
			return c.visualize();
		});
		return chunks.join("\n");
	}
}
