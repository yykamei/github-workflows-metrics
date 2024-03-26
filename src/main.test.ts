import { describe, it } from "vitest";
import { Configuration } from "./Configuration";
import main from "./main";

describe("main", () => {
	it("should run main function with source=memory", () => {
		const config = new Configuration({
			source: "memory",
		});
		main(config);
	});
});
