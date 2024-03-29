import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";

export class MermaidXYChart {
	constructor(
		private readonly workflow: GitHubWorkflow,
		private readonly runs: GitHubWorkflowRun[],
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
    title "${this.workflow.name} (${this.workflow.path})"
    x-axis "GitHub Workflow Run" [${xAxis.join(",")}]
    y-axis "Duration (in seconds)"
    bar [${seconds.join(",")}]
    line [${seconds.join(",")}]
\`\`\`
`;
	}
}
