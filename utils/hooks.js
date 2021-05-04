import {useEffect, useState} from "react";
import {sendRequest} from "./request";
import {createCkanRequest, getOrganizationsRequest} from "./ckan";

function mapOrganizationToOption(organization) {
	return {
		name: organization.display_name,
		value: organization.name
	};
}

const getOrganizations = (ckanServer, apiKey) => sendRequest(
	createCkanRequest(ckanServer, apiKey)(
		getOrganizationsRequest(true)
	)
);

const getCkanCredentials = () => sendRequest({
	method: "GET",
	url: "/api/ckan"
});

const map = (mapFn) => (arr) => arr.map(mapFn);

export function useOrganizations(ckanServer, apiKey) {
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (ckanServer && apiKey)
			getOrganizations(ckanServer, apiKey)
				.then(map(mapOrganizationToOption))
				.then(setResult)
				.then(() => setLoading(false));
	}, [ckanServer, apiKey]);

	return [result, loading];
}

export function useCkanCredentials() {
	const [result, setResult] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getCkanCredentials()
			.then(setResult)
			.then(() => setLoading(false));
	}, []);

	return [result, loading];
}