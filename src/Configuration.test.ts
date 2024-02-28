import { describe, expect, it } from "vitest";
import { Configuration } from "./Configuration";
import { GitHubAggregator } from "./GitHubAggregator";

describe("Configuration", () => {
	it("should create a Configuration with GitHubSource when source is github", () => {
		const config = new Configuration({
			source: "github",
			githubToken: "token",
			owner: "yykamei",
			repo: "github-workflows-metrics",
			workflowId: "ci.yml",
		});
		expect(config.aggregator).toBeInstanceOf(GitHubAggregator);
	});

	it("should throw an error when source is not supported", () => {
		expect(() => new Configuration({ source: "memory" })).toThrowError();
	});
});
