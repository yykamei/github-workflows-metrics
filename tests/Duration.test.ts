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
});
