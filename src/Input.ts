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

	get only(): string[] | null {
		const only = this.getInputFn("only");
		if (only.length === 0) {
			return null;
		}
		return only.split(/\s*,\s*/);
	}

	get excludePullRequests(): boolean {
		return this.getInputFn("exclude-pull-requests").toLowerCase() === "true";
	}

	get token(): string {
		return this.getInputFn("token", { required: true });
	}
}
