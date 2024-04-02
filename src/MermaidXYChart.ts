import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";
import type { Input } from "./Input";

export class MermaidXYChart {
	constructor(
		private readonly workflow: GitHubWorkflow,
		private readonly runs: GitHubWorkflowRun[],
		private readonly input: Input,
	) {}

	visualize(): string {
		const map = Map.groupBy(this.runs, (r) => {
			return r.date.toLocaleDateString("en-CA", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
		});
		const means: Map<string, number> = new Map();
		for (const [date, runs] of map.entries()) {
			const totalSeconds = runs.reduce(
				(sum, r) => sum + r.duration.toSeconds(),
				0,
			);
			means.set(date, totalSeconds / runs.length);
		}
		const xAxis: string[] = [];
		const seconds: number[] = [];
		for (const [date, mean] of means.entries()) {
			xAxis.unshift(date);
			seconds.unshift(mean);
		}
		const status = this.input.status ? ` for status=${this.input.status}` : "";
		return `
\`\`\`mermaid
---
config:
    xyChart:
        xAxis:
            labelPadding: 16
        yAxis:
            titlePadding: 16
---
xychart-beta
    title "${this.workflow.name} (${this.workflow.path}${status})"
    x-axis "GitHub Workflow Run" [${xAxis.join(",")}]
    y-axis "Duration (in seconds)"
    bar [${seconds.join(",")}]
    line [${seconds.join(",")}]
\`\`\`
`;
	}
}
