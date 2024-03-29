import { Context } from "@actions/github/lib/context";
import { describe, expect, it, vi } from "vitest";
import { DateTime } from "../src/DateTime";
import { GitHubIssueContent } from "../src/GitHubIssueContent";
import { GitHubWorkflow } from "../src/GitHubWorkflow";
import { GitHubWorkflowRun } from "../src/GitHubWorkflowRun";
import { Input } from "../src/Input";
import { MermaidXYChart } from "../src/MermaidXYChart";

describe("GitHubIssueContent", () => {
	it("should initialize", () => {
		const context = new Context();
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn(() => "");
		const input = new Input(context, getInput);

		const mermaidXYChart1 = new MermaidXYChart(
			new GitHubWorkflow(88, "ABC", "abc.yml"),
			[
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
			input,
		);
		const mermaidXYChart2 = new MermaidXYChart(
			new GitHubWorkflow(88, "XYZ", "xyz.yml"),
			[
				[
					new DateTime("2024-03-27T19:08:29Z"),
					new DateTime("2024-03-27T19:17:04Z"),
				],
			].map(
				([createdAt, updatedAt], index) =>
					new GitHubWorkflowRun({
						id: 456 + index,
						runNumber: 100 + index,
						name: null,
						displayTitle: "xyz",
						path: "xyz.yml",
						event: "push",
						conclusion: "success",
						workflowId: 923,
						// biome-ignore lint/style/noNonNullAssertion: the test data are supposed to be set.
						createdAt: createdAt!,
						// biome-ignore lint/style/noNonNullAssertion: the test data are supposed to be set.
						updatedAt: updatedAt!,
					}),
			),
			input,
		);
		const content = new GitHubIssueContent(
			[mermaidXYChart1, mermaidXYChart2],
			"test issue!",
		);
		expect(content.title).toEqual("test issue!");
		expect(content.body).toEqual(`
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
    title "ABC (abc.yml)"
    x-axis "GitHub Workflow Run" [3]
    y-axis "Duration (in seconds)"
    bar [815]
    line [815]
\`\`\`


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
    title "XYZ (xyz.yml)"
    x-axis "GitHub Workflow Run" [100]
    y-axis "Duration (in seconds)"
    bar [515]
    line [515]
\`\`\`
`);
	});
});
