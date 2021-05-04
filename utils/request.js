import axios from "axios";

export async function sendRequest(config) {
	console.log({sendRequest: config});
	const response = await axios(config);
	return response.data;
}