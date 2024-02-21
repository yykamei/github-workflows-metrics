import { Aggregator } from "./src/Aggregator.mjs";
import { Configuration } from "./src/Configuration.mjs";

const main = async () => {
	const configuration = new Configuration({ source: "github" });
	const aggregator = new Aggregator(configuration);
	await aggregator.run;
};

export default main;
