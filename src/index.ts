import { setFailed } from "@actions/core";
import main from "./main";

try {
	await main();
} catch (e) {
	console.error(e instanceof Error ? e.message : String(e));
	setFailed(`Unhandled error: ${e}`);
}
