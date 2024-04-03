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
		const aggregates: Map<string, number> = new Map();
		for (const [date, seconds] of map.entries()) {
			switch (this.input.aggregate) {
				case "average": {
					aggregates.set(date, getAverage(seconds));
					break;
				}
				case "median": {
					aggregates.set(date, getMedian(seconds));
					break;
				}
				case "min": {
					aggregates.set(date, getMin(seconds));
					break;
				}
				case "max": {
					aggregates.set(date, getMax(seconds));
					break;
				}
			}
		}
		const xAxis: string[] = [];
		const seconds: number[] = [];
		for (const [date, mean] of aggregates.entries()) {
			xAxis.unshift(`"${date}"`);
			seconds.unshift(mean);
		}
		const status = this.input.status ? ` for status=${this.input.status}` : "";
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
\`\`\`
`;
	}
}

const getAverage = (seconds: number[]): number => {
	const sum = seconds.reduce((a, b) => a + b, 0);
	return Math.round(sum / seconds.length);
};
const getMedian = (seconds: number[]): number => {
	const sortedSeconds = seconds.toSorted();
	const mid = Math.floor(sortedSeconds.length / 2);
	// @ts-ignore
	return sortedSeconds[mid];
};
const getMin = (seconds: number[]) => Math.min(...seconds);
const getMax = (seconds: number[]) => Math.max(...seconds);
