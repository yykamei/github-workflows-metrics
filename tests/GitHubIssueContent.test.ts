import { context } from "@actions/github";
import { describe, expect, it, vi } from "vitest";
import { DateTime } from "../src/DateTime";
import { GitHubIssueContent } from "../src/GitHubIssueContent";
import { GitHubWorkflow } from "../src/GitHubWorkflow";
import { GitHubWorkflowRun } from "../src/GitHubWorkflowRun";
import { Input } from "../src/Input";
import { MermaidXYChart } from "../src/MermaidXYChart";

describe("GitHubIssueContent", () => {
	it("should initialize", () => {
		vi.spyOn(context, "repo", "get").mockReturnValue({
			owner: "yykamei",
			repo: "test-repo",
		});
		const getInput = vi.fn((key: string) => {
			switch (key) {
				case "status":
					return "";
				case "aggregate":
					return "min";
				default:
					throw new Error("Unsupported key");
			}
		});
		const input = new Input(context, getInput);

		const mermaidXYChart1 = new MermaidXYChart(
			new GitHubWorkflow(88, "ABC", "abc.yml"),
			[
				new GitHubWorkflowRun({
					id: 123,
					runNumber: 3,
					name: null,
					displayTitle: "abc",
					path: "abc.yml",
					event: "push",
					conclusion: "success",
					workflowId: 88,
					createdAt: new DateTime("2024-02-27T09:03:29Z"),
					updatedAt: new DateTime("2024-02-27T09:03:33Z"),
					runStartedAt: new DateTime("2024-02-27T09:03:29Z"),
				}),
			],
			input,
		);
		const mermaidXYChart2 = new MermaidXYChart(
			new GitHubWorkflow(88, "XYZ", "xyz.yml"),
			[
				new GitHubWorkflowRun({
					id: 456,
					runNumber: 100,
					name: null,
					displayTitle: "xyz",
					path: "xyz.yml",
					event: "push",
					conclusion: "success",
					workflowId: 923,
					createdAt: new DateTime("2024-03-27T12:08:29Z"),
					updatedAt: new DateTime("2024-03-27T12:08:31Z"),
					runStartedAt: new DateTime("2024-03-27T12:08:29Z"),
				}),
			],
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
        width: 900
        xAxis:
            labelPadding: 16
            labelFontSize: 8
        yAxis:
            titlePadding: 16
---
xychart-beta
    title "ABC (abc.yml)"
    x-axis ["Feb 27"]
    y-axis "Duration (min in seconds)" 3 --> 4
    bar [4]
\`\`\`


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
    title "XYZ (xyz.yml)"
    x-axis ["Mar 27"]
    y-axis "Duration (min in seconds)" 1 --> 2
    bar [2]
\`\`\`
`);
	});
});
