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
