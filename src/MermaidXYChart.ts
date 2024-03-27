import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";

export class MermaidXYChart {
	constructor(
		private readonly workflow: GitHubWorkflow,
		private readonly runs: GitHubWorkflowRun[],
	) {}

	visualize(): string {
		const xAxis = this.runs.map((r) => r.parameters.runNumber);
		const seconds = this.runs.map((r) => r.duration.toSeconds());
		return `
\`\`\`mermaid
---
config:
    xyChart:
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
