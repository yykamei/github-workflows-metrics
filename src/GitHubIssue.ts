type IssueParameters = {
	readonly id: number;
	readonly url: string;
	readonly number: number;
	readonly state: string;
	readonly title: string;
	readonly body: string;
};

export class GitHubIssue {
	constructor(public readonly parameters: IssueParameters) {}
}
