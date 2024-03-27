import { describe, expect, it } from "vitest";
import { Duration } from "../src/Duration";

describe("Duration.toHumanReadableFormat()", () => {
	it("should return correct human-readable format string", () => {
		expect(new Duration(883).milliseconds).toEqual(883);
		expect(new Duration(338).toHumanReadableFormat()).toEqual("0s");
		expect(new Duration(739).toHumanReadableFormat()).toEqual("1s");
		expect(new Duration(8938).toHumanReadableFormat()).toEqual("9s");
		expect(new Duration(15399).toHumanReadableFormat()).toEqual("15s");
		expect(new Duration(65893).toHumanReadableFormat()).toEqual("1m 6s");
		expect(new Duration(3738806).toHumanReadableFormat()).toEqual("1h 2m 19s");
		expect(new Duration(3613206).toHumanReadableFormat()).toEqual("1h 0m 13s");
		expect(new Duration(7138206).toHumanReadableFormat()).toEqual("1h 58m 58s");
	});

	it("should return value in seconds", () => {
		expect(new Duration(338).toSeconds()).toEqual(0);
		expect(new Duration(739).toSeconds()).toEqual(1);
		expect(new Duration(8938).toSeconds()).toEqual(9);
		expect(new Duration(15399).toSeconds()).toEqual(15);
		expect(new Duration(65893).toSeconds()).toEqual(66);
		expect(new Duration(3738806).toSeconds()).toEqual(3739);
		expect(new Duration(3613206).toSeconds()).toEqual(3613);
		expect(new Duration(7138206).toSeconds()).toEqual(7138);
	})
});
