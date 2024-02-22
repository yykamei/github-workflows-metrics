import { Aggregator } from "./Aggregator";
import { Configuration } from "./Configuration";

const main = async () => {
	const configuration = new Configuration({ source: "github" });
	const aggregator = new Aggregator(configuration);
	await aggregator.run;
};

export default main;
