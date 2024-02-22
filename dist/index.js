/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __nccwpck_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: ./src/Aggregator.ts
class Aggregator {
    source;
    /**
     *
     * @param {Configuration} configuration - The global configuration for this package.
     */
    constructor(configuration) {
        this.source = configuration.source;
    }
    async run() {
        return this.source.fetch();
    }
}

;// CONCATENATED MODULE: ./src/GitHubSource.ts
class GitHubSource {
    async fetch() { }
}

;// CONCATENATED MODULE: ./src/Configuration.ts

class Configuration {
    source;
    /**
     *
     * @param {ConfigurationInput} params - Configuration Input
     */
    constructor(params) {
        this.source = setSource(params.source);
    }
}
const setSource = (_input) => {
    // TODO: Support other sources.
    return new GitHubSource();
};

;// CONCATENATED MODULE: ./src/index.ts


const main = async () => {
    const configuration = new Configuration({ source: "github" });
    const aggregator = new Aggregator(configuration);
    await aggregator.run;
};
/* harmony default export */ const src = (main);

module.exports = __webpack_exports__;
/******/ })()
;