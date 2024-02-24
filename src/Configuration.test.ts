import { beforeEach, describe, expect, it } from "vitest";
import { Configuration, ConfigurationInput } from "./Configuration";
import { GitHubSource } from "./GitHubSource";

describe("Configuration", () => {
	let githubToken: string;
	let source: string;
	let configInput: ConfigurationInput;

	beforeEach(() => {
		githubToken = "testToken";
		source = "github";
		configInput = { githubToken, source };
	});

	it("should create a Configuration with GitHubSource when source is github", () => {
		const config = new Configuration(configInput);
		expect(config.githubToken).toBe(githubToken);
		expect(config.source).toBeInstanceOf(GitHubSource);
	});

	it("should throw an error when source is not supported", () => {
		configInput.source = "unsupportedSource";
		expect(() => new Configuration(configInput)).toThrowError();
	});
});
