import type { Duration } from "./Duration";

export class Usage {
	constructor(
		public readonly runId: number,
		public readonly duration: Duration | null,
	) {}
}
