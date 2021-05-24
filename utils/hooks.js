import {useEffect, useState} from "react";
import {sendRequest} from "./request";
import {createCkanRequest, getOrganizationsRequest, getTagsRequest} from "./ckan";
import {sortedUniq, sortBy} from "lodash";

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
				.catch((e) => console.error(e))
				.finally(() => setLoading(false));
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

const getTags = (ckanServer, apiKey) => sendRequest(
	createCkanRequest(ckanServer, apiKey)(
		getTagsRequest(true)
	)
);

export function useTags(ckanServer, apiKey)
{
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (ckanServer && apiKey)
			getTags(ckanServer, apiKey)
				.then((tags) => tags.map((t) => String(t).toLowerCase()))
				.then((tags) => sortBy(tags))
				.then((tags) => sortedUniq(tags))
				.then(setResult)
				.catch((e) => console.error(e))
				.finally(() => setLoading(false));
	}, [ckanServer, apiKey]);

	return [result, loading];
}