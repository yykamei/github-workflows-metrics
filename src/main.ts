import { Configuration } from "./Configuration";

const main = async (configuration?: Configuration) => {
	const config =
		configuration ||
		new Configuration({
			source: "github",
			githubToken: "token",
			owner: "yykamei",
			repo: "github-workflows-metrics",
			workflowId: "ci.yml",
		});
	const aggregator = config.aggregator;
	await aggregator.fetch();
};

export default main;
