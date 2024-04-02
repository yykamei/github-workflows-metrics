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
		const map: Map<string, number[]> = this.runs.reduce((m, r) => {
			const date = r.date.toLocaleDateString("en-CA", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
			const d = m.get(date);
			if (d) {
				d.push(r.duration.toSeconds());
			} else {
				m.set(date, [r.duration.toSeconds()]);
			}
			return m;
		}, new Map());
		const means: Map<string, number> = new Map();
		for (const [date, seconds] of map.entries()) {
			const total = seconds.reduce((sum, s) => sum + s, 0);
			means.set(date, Math.round(total / seconds.length));
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
    x-axis [${xAxis.join(",")}]
    y-axis "Duration (in seconds)"
    bar [${seconds.join(",")}]
\`\`\`
`;
	}
}
