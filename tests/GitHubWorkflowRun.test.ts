import { describe, expect, it } from "vitest";
import { DateTime } from "../src/DateTime";
import { GitHubWorkflowRun } from "../src/GitHubWorkflowRun";

describe("GitHubWorkflowRun", () => {
	it("should initialize", () => {
		const run = new GitHubWorkflowRun({
			id: 123,
			runNumber: 3,
			name: null,
			displayTitle: "abc",
			path: "abc.yml",
			event: "push",
			conclusion: "failure",
			workflowId: 88,
			createdAt: new DateTime("2024-02-26T08:59:49Z"),
			updatedAt: new DateTime("2024-02-26T08:59:49Z"),
			runStartedAt: new DateTime("2024-02-26T08:59:49Z"),
		});
		expect(run).toHaveProperty("parameters");
	});

	it("should return duration with createdAt", () => {
		const run = new GitHubWorkflowRun({
			id: 123,
			runNumber: 3,
			name: null,
			displayTitle: "abc",
			path: "abc.yml",
			event: "push",
			conclusion: "failure",
			workflowId: 88,
			createdAt: new DateTime("2024-03-23T10:58:30Z"),
			updatedAt: new DateTime("2024-03-23T11:07:49Z"),
		});
		expect(run.duration.toHumanReadableFormat()).toEqual("9m 19s");
	});

	it("should return duration with runStartedAt", () => {
		const run = new GitHubWorkflowRun({
			id: 123,
			runNumber: 3,
			name: null,
			displayTitle: "abc",
			path: "abc.yml",
			event: "push",
			conclusion: "failure",
			workflowId: 88,
			createdAt: new DateTime("2024-03-20T10:58:30Z"),
			updatedAt: new DateTime("2024-03-23T11:07:49Z"),
			runStartedAt: new DateTime("2024-03-23T11:02:48Z"),
		});
		expect(run.duration.toHumanReadableFormat()).toEqual("5m 1s");
	});

	it("should return date", () => {
		const run = new GitHubWorkflowRun({
			id: 123,
			runNumber: 3,
			name: null,
			displayTitle: "abc",
			path: "abc.yml",
			event: "push",
			conclusion: "failure",
			workflowId: 88,
			createdAt: new DateTime("2023-09-03T10:58:30Z"),
			updatedAt: new DateTime("2023-10-03T11:07:49Z"),
			runStartedAt: new DateTime("2023-10-03T10:59:48Z"),
		});
		expect(run.date).toEqual(new Date(1693738710000));
	});

	it("should return true if the duration is more than 6 hours", () => {
		const run = new GitHubWorkflowRun({
			id: 123,
			runNumber: 3,
			name: null,
			displayTitle: "abc",
			path: "abc.yml",
			event: "push",
			conclusion: "failure",
			workflowId: 88,
			createdAt: new DateTime("2023-10-03T10:58:48Z"),
			updatedAt: new DateTime("2023-10-03T16:58:49Z"),
			runStartedAt: new DateTime("2023-10-03T10:58:48Z"),
		});
		expect(run.isOutlier).toBe(true);
	});

	it("should return false if the duration is less than 6 hours", () => {
		const run = new GitHubWorkflowRun({
			id: 123,
			runNumber: 3,
			name: null,
			displayTitle: "abc",
			path: "abc.yml",
			event: "push",
			conclusion: "failure",
			workflowId: 88,
			createdAt: new DateTime("2023-10-03T10:58:48Z"),
			updatedAt: new DateTime("2023-10-03T16:58:48Z"),
			runStartedAt: new DateTime("2023-10-03T10:58:48Z"),
		});
		expect(run.isOutlier).toBe(false);
	});
});
