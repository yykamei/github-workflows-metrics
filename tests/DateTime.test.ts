import { describe, expect, it } from "vitest";
import { DateTime } from "../src/DateTime";

describe("DateTime", () => {
	it("should initialize", () => {
		const dateTime = new DateTime("2024-02-26T08:59:49Z");
		expect(dateTime.value).toEqual(1708937989000);
	});
});
