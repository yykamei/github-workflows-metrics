import { afterEach, describe, expect, it, vi } from "vitest";
import { GitHubAPIClient } from "../src/GitHubAPIClient";
import { GitHubWorkflow } from "../src/GitHubWorkflow";

describe("GitHubAPIClient.getWorkflow()", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should get workflow from GitHub", async () => {
		const client = new GitHubAPIClient("token");
		const spy = vi.spyOn(client.client, "request");
		spy.mockResolvedValueOnce({
			data: { id: 8123, name: "CI" },
			headers: vi.fn()(),
			url: "https://example.com",
			status: 200,
		});

		const workflow = await client.getWorkflow(
			"yykamei",
			"test-repo",
			"super-workflow.yml",
		);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(workflow).toBeInstanceOf(GitHubWorkflow);
		expect(workflow.id).toEqual(8123);
		expect(workflow.name).toEqual("CI");
		expect(workflow.path).toEqual("super-workflow.yml");
	});
});

describe("GitHubAPIClient.getWorkflows()", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should get workflows from GitHub", async () => {
		const client = new GitHubAPIClient("token");
		const spy = vi.spyOn(client.client, "request");
		spy.mockResolvedValueOnce({
			data: {
				workflows: [
					{ id: 3, name: "a", path: "a.yml" },
					{ id: 47, name: "b", path: "b.yml" },
				],
			},
			headers: vi.fn()(),
			url: "https://example.com",
			status: 200,
		});

		const workflows = await client.getWorkflows("yykamei", "test-repo");
		expect(spy).toHaveBeenCalledTimes(1);
		expect(workflows).toHaveProperty([0, "id"], 3);
		expect(workflows).toHaveProperty([0, "name"], "a");
		expect(workflows).toHaveProperty([0, "path"], "a.yml");
		expect(workflows).toHaveProperty([1, "id"], 47);
		expect(workflows).toHaveProperty([1, "name"], "b");
		expect(workflows).toHaveProperty([1, "path"], "b.yml");
	});
});

describe("GitHubAPIClient.getWorkflowRuns()", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should get workflow runs from GitHub", async () => {
		const client = new GitHubAPIClient("token");
		const spy = vi.spyOn(client.client, "request");
		spy.mockResolvedValueOnce({
			data: {
				workflow_runs: [
					{
						id: 3,
						run_number: 39,
						name: "a",
						display_title: "AA",
						path: "a.yml",
						event: "push",
						conclusion: "success",
						workflow_id: 34,
						created_at: "2024-02-24T13:27:11Z",
						updated_at: "2024-02-24T13:27:53Z",
					},
					{
						id: 4,
						run_number: 40,
						name: "b",
						display_title: "BB",
						path: "b.yml",
						event: "push",
						conclusion: "success",
						workflow_id: 34,
						created_at: "2024-02-28T09:27:08Z",
						updated_at: "2024-02-28T10:03:45Z",
					},
				],
			},
			headers: vi.fn()(),
			url: "https://example.com",
			status: 200,
		});

		const runs = await client.getWorkflowRuns("yykamei", "test-repo", 34);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(runs).toHaveProperty([0, "parameters", "id"], 3);
		expect(runs).toHaveProperty([1, "parameters", "id"], 4);
	});
});
