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
		const runs = this.runs.toSorted((a, b) => {
			const aa = a.date.getTime();
			const bb = b.date.getTime();
			if (aa === bb) {
				return 0;
			}
			if (aa < bb) {
				return -1;
			}
			return 1;
		});
		const xAxis = runs.map((r) => r.parameters.runNumber);
		const seconds = runs.map((r) => r.duration.toSeconds());
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
