import { setFailed } from "@actions/core";
import main from "./main";

try {
	await main();
} catch (e) {
	setFailed(`Unhandled error: ${e}`);
}
