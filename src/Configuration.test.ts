import { describe, expect, it } from "vitest";
import { Configuration } from "./Configuration";
import { GitHubAggregator } from "./GitHubAggregator";
import { MemoryAggregator } from "./MemoryAggregator";

describe("Configuration", () => {
	it("should create a Configuration with GitHubAggregator when source is github", () => {
		const config = new Configuration({
			source: "github",
			githubToken: "token",
			owner: "yykamei",
			repo: "github-workflows-metrics",
			workflowId: "ci.yml",
		});
		expect(config.aggregator).toBeInstanceOf(GitHubAggregator);
	});

	it("should create a Configuration With MemoryAggregator when source is memory", () => {
		const config = new Configuration({ source: "memory" });
		expect(config.aggregator).toBeInstanceOf(MemoryAggregator);
	});
});
