import axios from "axios";

export async function sendRequest(config) {
	const response = await axios(config);
	return response.data;
}