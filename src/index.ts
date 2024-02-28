import { Configuration } from "./Configuration";

const main = async () => {
	const configuration = new Configuration({
		source: "github",
		githubToken: "token",
		owner: "yykamei",
		repo: "github-workflows-metrics",
		workflowId: "ci.yml",
	});
	const aggregator = configuration.aggregator;
	await aggregator.fetch();
};

export default main;
