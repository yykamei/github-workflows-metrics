import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";
import type { Input } from "./Input";
import type { Usage } from "./Usage";

export class MermaidXYChart {
	constructor(
		private readonly workflow: GitHubWorkflow,
		private readonly runs: GitHubWorkflowRun[],
		private readonly usages: Usage[],
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
		const seconds = runs.map((r) => {
			const usage = this.usages.find((u) => u.runId === r.parameters.id);
			if (!usage) {
				throw new Error(`Usage must exist here with runId=${r.parameters.id}`);
			}
			return usage.duration?.toSeconds() || 0;
		});
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
