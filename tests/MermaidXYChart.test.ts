import { describe, expect, it } from "vitest";
import { DateTime } from "../src/DateTime";
import { GitHubWorkflow } from "../src/GitHubWorkflow";
import { GitHubWorkflowRun } from "../src/GitHubWorkflowRun";
import { MermaidXYChart } from "../src/MermaidXYChart";

describe("DateTime", () => {
	it("should initialize", () => {
		const mermaidXYChart = new MermaidXYChart(
			new GitHubWorkflow(88, "ABC", "abc.yml"),
			[
				[
					new DateTime("2024-02-19T08:59:49Z"),
					new DateTime("2024-02-19T09:08:30Z"),
				],
				[
					new DateTime("2024-02-20T09:03:38Z"),
					new DateTime("2024-02-20T09:19:20Z"),
				],
				[
					new DateTime("2024-02-21T09:04:38Z"),
					new DateTime("2024-02-21T09:20:49Z"),
				],
				[
					new DateTime("2024-02-22T09:38:12Z"),
					new DateTime("2024-02-22T09:55:47Z"),
				],
				[
					new DateTime("2024-02-23T08:58:29Z"),
					new DateTime("2024-02-23T09:13:40Z"),
				],
				[
					new DateTime("2024-02-24T08:56:28Z"),
					new DateTime("2024-02-24T09:08:42Z"),
				],
				[
					new DateTime("2024-02-25T08:59:20Z"),
					new DateTime("2024-02-25T09:10:44Z"),
				],
				[
					new DateTime("2024-02-26T09:09:30Z"),
					new DateTime("2024-02-26T09:20:28Z"),
				],
				[
					new DateTime("2024-02-27T09:03:29Z"),
					new DateTime("2024-02-27T09:17:04Z"),
				],
			].map(
				([createdAt, updatedAt], index) =>
					new GitHubWorkflowRun({
						id: 123 + index,
						runNumber: 3 + index,
						name: null,
						displayTitle: "abc",
						path: "abc.yml",
						event: "push",
						conclusion: "success",
						workflowId: 88,
						// biome-ignore lint/style/noNonNullAssertion: the test data are supposed to be set.
						createdAt: createdAt!,
						// biome-ignore lint/style/noNonNullAssertion: the test data are supposed to be set.
						updatedAt: updatedAt!,
					}),
			),
		);
		console.log(mermaidXYChart.visualize());
		expect(mermaidXYChart.visualize()).toEqual(`
\`\`\`mermaid
---
config:
    xyChart:
        yAxis:
            titlePadding: 16
---
xychart-beta
    title "ABC (abc.yml)"
    x-axis "GitHub Workflow Run" [3,4,5,6,7,8,9,10,11]
    y-axis "Duration (in seconds)"
    bar [521,942,971,1055,911,734,684,658,815]
    line [521,942,971,1055,911,734,684,658,815]
\`\`\`
`);
	});
});
