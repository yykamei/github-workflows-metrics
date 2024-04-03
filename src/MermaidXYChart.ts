import type { GitHubWorkflow } from "./GitHubWorkflow";
import type { GitHubWorkflowRun } from "./GitHubWorkflowRun";
import type { Input } from "./Input";

type Percentiles = {
	readonly p50: number;
	readonly p90: number;
	readonly p95: number;
};

export class MermaidXYChart {
	constructor(
		private readonly workflow: GitHubWorkflow,
		private readonly runs: GitHubWorkflowRun[],
		private readonly input: Input,
	) {}

	visualize(): string {
		const map: Map<string, number[]> = this.runs.reduce((m, r) => {
			if (r.isOutlier) {
				return m;
			}
			const date = r.date.toLocaleDateString("en-CA", {
				month: "short",
				day: "numeric",
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
			xAxis.unshift(`"${date}"`);
			seconds.unshift(mean);
		}
		const status = this.input.status ? ` for status=${this.input.status}` : "";
		const { p50, p90, p95 } = this.getPercentiles();
		return `
\`\`\`mermaid
---
config:
    xyChart:
        width: 900
        xAxis:
            labelPadding: 16
            labelFontSize: 8
        yAxis:
            titlePadding: 16
---
xychart-beta
    title "${this.workflow.name} (${this.workflow.path}${status})"
    x-axis [${xAxis.join(",")}]
    y-axis "Duration (in seconds)"
    bar [${seconds.join(",")}]
    line [${seconds.map(() => p50).join(",")}]
    line [${seconds.map(() => p90).join(",")}]
    line [${seconds.map(() => p95).join(",")}]
\`\`\`
`;
	}

	private getPercentiles(): Percentiles {
		const durations = this.runs
			.filter((run) => !run.isOutlier)
			.map((run) => run.duration.toSeconds())
			.sort((a, b) => a - b);

		const percentile = (p: number): number => {
			const index = Math.floor(p * durations.length);
			// @ts-ignore
			return durations[index];
		};

		return {
			p50: percentile(0.5),
			p90: percentile(0.9),
			p95: percentile(0.95),
		};
	}
}
