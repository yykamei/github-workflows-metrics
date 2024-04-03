import { Context } from "@actions/github/lib/context";
import { describe, expect, it, vi } from "vitest";
import { DateTime } from "../src/DateTime";
import { GitHubWorkflow } from "../src/GitHubWorkflow";
import { GitHubWorkflowRun } from "../src/GitHubWorkflowRun";
import { Input } from "../src/Input";
import { MermaidXYChart } from "../src/MermaidXYChart";

describe("DateTime", () => {
	it("should initialize", () => {
		const context = new Context();
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn((key: string) => {
			switch (key) {
				case "status":
					return "";
				case "aggregate":
					return "average";
				default:
					throw new Error("Unsupported key");
			}
		});
		const input = new Input(context, getInput);
		const dates = [
			[
				new DateTime("2024-02-27T09:03:29Z"),
				new DateTime("2024-02-27T09:17:04Z"),
			],
			[
				new DateTime("2024-02-26T09:09:30Z"),
				new DateTime("2024-02-26T09:20:28Z"),
			],
			[
				new DateTime("2024-02-25T08:59:20Z"),
				new DateTime("2024-02-25T09:10:44Z"),
			],
			[
				new DateTime("2024-02-24T08:56:28Z"),
				new DateTime("2024-02-24T09:08:42Z"),
			],
			[
				new DateTime("2024-02-23T08:58:29Z"),
				new DateTime("2024-02-23T09:13:40Z"),
			],
			[
				new DateTime("2024-02-22T09:38:12Z"),
				new DateTime("2024-02-22T09:55:47Z"),
			],
			[
				new DateTime("2024-02-21T09:04:38Z"),
				new DateTime("2024-02-21T09:20:49Z"),
			],
			[
				new DateTime("2024-02-20T09:03:38Z"),
				new DateTime("2024-02-20T09:19:20Z"),
			],
			[
				new DateTime("2024-02-19T08:59:49Z"),
				new DateTime("2024-02-19T09:08:30Z"),
			],
			[
				new DateTime("2024-02-19T14:01:42Z"),
				new DateTime("2024-02-19T14:07:08Z"),
			],
			[
				new DateTime("2024-02-18T14:01:42Z"),
				new DateTime("2024-02-18T20:07:08Z"),
			],
		];
		const runs = dates.map(
			([createdAt, updatedAt], index) =>
				new GitHubWorkflowRun({
					id: 123 - index,
					runNumber: 300 - index,
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
		);
		const mermaidXYChart = new MermaidXYChart(
			new GitHubWorkflow(88, "ABC", "abc.yml"),
			runs,
			input,
		);
		expect(mermaidXYChart.visualize()).toEqual(`
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
    title "ABC (abc.yml)"
    x-axis ["Feb 19","Feb 20","Feb 21","Feb 22","Feb 23","Feb 24","Feb 25","Feb 26","Feb 27"]
    y-axis "Duration (in seconds)"
    bar [424,942,971,1055,911,734,684,658,815]
\`\`\`
`);
	});

	it("should return medians", () => {
		const context = new Context();
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn((key: string) => {
			switch (key) {
				case "status":
					return "";
				case "aggregate":
					return "median";
				default:
					throw new Error("Unsupported key");
			}
		});
		const input = new Input(context, getInput);
		const dates = [
			[
				new DateTime("2024-02-19T12:40:30Z"),
				new DateTime("2024-02-19T12:48:30Z"),
			],
			[
				new DateTime("2024-02-19T11:50:42Z"),
				new DateTime("2024-02-19T11:54:42Z"),
			],
			[
				new DateTime("2024-02-19T11:30:28Z"),
				new DateTime("2024-02-19T11:37:38Z"),
			],
		];
		const runs = dates.map(
			([createdAt, updatedAt], index) =>
				new GitHubWorkflowRun({
					id: 123 - index,
					runNumber: 300 - index,
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
		);
		const mermaidXYChart = new MermaidXYChart(
			new GitHubWorkflow(88, "ABC", "abc.yml"),
			runs,
			input,
		);
		expect(mermaidXYChart.visualize()).toEqual(`
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
    title "ABC (abc.yml)"
    x-axis ["Feb 19"]
    y-axis "Duration (in seconds)"
    bar [430]
\`\`\`
`);
	});

	it("should add status", () => {
		const context = new Context();
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn((key: string) => {
			switch (key) {
				case "status":
					return "success";
				case "aggregate":
					return "max";
				default:
					throw new Error("Unsupported key");
			}
		});
		const input = new Input(context, getInput);
		const mermaidXYChart = new MermaidXYChart(
			new GitHubWorkflow(88, "ABC", "abc.yml"),
			[
				new GitHubWorkflowRun({
					id: 123,
					runNumber: 200,
					name: null,
					displayTitle: "abc",
					path: "abc.yml",
					event: "push",
					conclusion: "success",
					workflowId: 88,
					createdAt: new DateTime("2024-02-19T08:59:49Z"),
					updatedAt: new DateTime("2024-02-19T09:08:30Z"),
					runStartedAt: new DateTime("2024-02-19T08:59:49Z"),
				}),
			],
			input,
		);
		expect(mermaidXYChart.visualize()).toEqual(`
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
    title "ABC (abc.yml for status=success)"
    x-axis ["Feb 19"]
    y-axis "Duration (in seconds)"
    bar [521]
\`\`\`
`);
	});
});
