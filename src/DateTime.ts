export class DateTime {
	public readonly value: number;

	constructor(originalString: string) {
		this.value = Date.parse(originalString);
	}
}
