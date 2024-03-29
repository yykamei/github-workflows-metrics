import { describe, expect, it } from "vitest";
import { Duration } from "../src/Duration";
import { Usage } from "../src/Usage";

describe("Usage", () => {
	it("should initialize", () => {
		expect(new Usage(123, new Duration(8312))).toHaveProperty("runId", 123);
		expect(new Usage(123, new Duration(8312))).toHaveProperty(
			"duration",
			expect.any(Duration),
		);
		expect(new Usage(123, null)).toHaveProperty("duration", null);
	});
});
