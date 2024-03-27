import { setFailed } from "@actions/core";
import main from "./main";

try {
	await main();
} catch (e) {
	console.log(e);
	setFailed(`Unhandled error: ${e}`);
}
