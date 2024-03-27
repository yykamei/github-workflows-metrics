import { Duration } from "./Duration";

export class DateTime {
	public readonly value: number;

	constructor(originalString: string) {
		this.value = Date.parse(originalString);
	}

	minus(other: DateTime): Duration {
		return new Duration(this.value - other.value);
	}
}
