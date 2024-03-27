import { describe, expect, it } from "vitest";
import { DateTime } from "../src/DateTime";
import { Duration } from "../src/Duration";

describe("DateTime", () => {
	it("should initialize", () => {
		const dateTime = new DateTime("2024-02-26T08:59:49Z");
		expect(dateTime.value).toEqual(1708937989000);
	});

	it("should return Duration with minus()", () => {
		const dateTime = new DateTime("2024-02-26T08:59:49Z");
		const other = new DateTime("2024-02-26T07:38:20Z");
		const duration = dateTime.minus(other);
		expect(duration).toBeInstanceOf(Duration);
		expect(duration.toHumanReadableFormat()).toEqual("1h 21m 29s");
	});
});
