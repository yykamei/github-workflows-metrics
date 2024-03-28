import { type InputOptions, getInput } from "@actions/core";
import { context } from "@actions/github";
import type { Context } from "@actions/github/lib/context";

export class Input {
	constructor(
		private readonly ctx: Context = context,
		private readonly getInputFn: (
			name: string,
			options?: InputOptions,
		) => string = getInput,
	) {}

	get owner(): string {
		return this.ctx.repo.owner;
	}

	get repo(): string {
		return this.ctx.repo.repo;
	}

	get label(): string {
		return this.getInputFn("label");
	}

	get token(): string {
		return this.getInputFn("token", { required: true });
	}
}
