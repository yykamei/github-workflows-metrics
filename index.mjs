import {Aggregator} from "./src/Aggregator.mjs";
import {Configuration} from "./src/Configuration.mjs";

const main = async () => {
    const configuration = new Configuration({})
    const aggregator = new Aggregator(configuration)
    await aggregator.run
}

export default main
