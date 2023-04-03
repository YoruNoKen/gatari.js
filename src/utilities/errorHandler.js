function errorHandler(code) {
	let error;
	if (code == 400) {
		error = new Error("Bad Request - the request could not be understood or was missing required parameters.");
	}
	if (code == 403) {
		error = new Error("Forbidden - access denied.");
	}
	if (code == 404) {
		error = new Error("Not Found - resource was not found.");
	}
	return error;
}

function validHandler(param) {
	let error;
	if (isNaN(param)) {
		error = new Error(`"${param}" parameter must be a number`);
	}
	return error;
}
module.exports = { handlers: { errorHandler, validHandler } };
