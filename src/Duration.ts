export class Duration {
	constructor(public readonly milliseconds: number) {}

	toHumanReadableFormat(): string {
		const secondsPart = Math.round(this.milliseconds / 1000) % 60;
		const minutesPart = Math.floor(this.milliseconds / (1000 * 60)) % 60;
		const hoursPart = Math.floor(this.milliseconds / (1000 * 60 * 60)) % 24;

		let str = "";
		if (hoursPart > 0) {
			str += `${hoursPart}h `;
		}
		if (str || minutesPart > 0) {
			str += `${minutesPart}m `;
		}
		str += `${secondsPart}s`;

		return str;
	}
}
