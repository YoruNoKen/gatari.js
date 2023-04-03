const { handlers } = require("./errorHandler");

async function stringToID(string) {
	let baseURL = "https://api.gatari.pw";
	if (!isNaN(string)) {
		return string;
	}

	let userParam = `?u=${string}`;
	const url = `${baseURL}/users/get${userParam}`;
	const response = await fetch(url).then((res) => res.json());

	var error = handlers.errorHandler(response.code);
	if (error !== undefined) {
		throw error;
	}
	if (response.users[0] == undefined) {
		throw new Error("Invalid username/id");
	}

	let user_id = response.users[0].id;

	return user_id;
}

module.exports = { stringToID };
