import core, { type InputOptions } from "@actions/core";
import github from "@actions/github";
import type { Context } from "@actions/github/lib/context";

export class Input {
	constructor(
		private readonly context: Context = github.context,
		private readonly getInput: (
			name: string,
			options?: InputOptions,
		) => string = core.getInput,
	) {}

	get owner(): string {
		return this.context.repo.owner;
	}

	get repo(): string {
		return this.context.repo.repo;
	}

	get token(): string {
		return this.getInput("token", { required: true });
	}
}
