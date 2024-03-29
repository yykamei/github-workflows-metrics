import { Context } from "@actions/github/lib/context";
import { describe, expect, it, vi } from "vitest";
import { DateTime } from "../src/DateTime";
import { Duration } from "../src/Duration";
import { GitHubIssueContent } from "../src/GitHubIssueContent";
import { GitHubWorkflow } from "../src/GitHubWorkflow";
import { GitHubWorkflowRun } from "../src/GitHubWorkflowRun";
import { Input } from "../src/Input";
import { MermaidXYChart } from "../src/MermaidXYChart";
import { Usage } from "../src/Usage";

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
					updatedAt: new DateTime("2024-02-27T09:17:04Z"),
				}),
			],
			[new Usage(123, new Duration(3881))],
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
					createdAt: new DateTime("2024-03-27T19:08:29Z"),
					updatedAt: new DateTime("2024-03-27T19:17:04Z"),
				}),
			],
			[new Usage(456, new Duration(1882))],
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
    bar [4]
    line [4]
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
    bar [2]
    line [2]
\`\`\`
`);
	});
});
