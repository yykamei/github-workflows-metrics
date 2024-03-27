import { describe, expect, it } from "vitest";
import { GitHubIssue } from "../src/GitHubIssue";

describe("GitHubIssue", () => {
	it("should initialize", () => {
		const issue = new GitHubIssue({
			id: 234,
			url: "https://github.com/yykamei/test-repo/issue/234",
			number: 2340,
			state: "open",
			title: "test",
			body: "body",
		});
		expect(issue.parameters.id).toEqual(234);
		expect(issue.parameters.url).toEqual(
			"https://github.com/yykamei/test-repo/issue/234",
		);
		expect(issue.parameters.number).toEqual(2340);
		expect(issue.parameters.state).toEqual("open");
		expect(issue.parameters.title).toEqual("test");
		expect(issue.parameters.body).toEqual("body");
	});
});
