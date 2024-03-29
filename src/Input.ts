import { type InputOptions, getInput } from "@actions/core";
import { context } from "@actions/github";
import type { Context } from "@actions/github/lib/context";
import type { WorkflowStatus } from "./APIClient";

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

	get status(): WorkflowStatus | undefined {
		const s = this.getInputFn("status");
		switch (s) {
			case "queued":
				return s;
			case "in_progress":
				return s;
			case "completed":
				return s;
			case "action_required":
				return s;
			case "cancelled":
				return s;
			case "failure":
				return s;
			case "neutral":
				return s;
			case "skipped":
				return s;
			case "stale":
				return s;
			case "success":
				return s;
			case "timed_out":
				return s;
			case "requested":
				return s;
			case "waiting":
				return s;
			case "pending":
				return s;
			default:
				return undefined;
		}
	}

	get token(): string {
		return this.getInputFn("token", { required: true });
	}
}
