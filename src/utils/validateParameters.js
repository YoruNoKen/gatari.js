const { handlers } = require("../utils/errorHandler");

function validateParameters(parameters) {
	parameters.forEach((param) => {
		if (param != undefined) {
			const error = handlers.validHandler(param);
			if (error !== undefined) {
				throw error;
			}
		}
	});
}

module.exports = { validateParameters };
