export const createCkanRequest = (ckanServer, apiKey) => (config) => ({
	baseURL: ckanServer + "api/action/",
	headers: {
		"X-CKAN-API-KEY": apiKey,
	},
	transformResponse: [
		JSON.parse,
		(data) => data.result
	],
	...config,
});

export const getOrganizationsRequest = (allFields = false) => ({
	method: "GET",
	url: "organization_list",
	params: {
		all_fields: allFields
	}
});

export const createPackageRequest = (data) => ({
	method: "POST",
	url: "package_create",
	data,
});

export const getTagsRequest = () => ({
	method: "GET",
	url: "tag_list",
});

export const createResourceRequest = (upload, packageId) => {
	const nameParts = upload.name.split(".");
	const data = new FormData();
	data.append("package_id", packageId);
	data.append("name", upload.name);
	data.append("format", nameParts[nameParts.length - 1]);
	data.append("mimetype", upload.type);
	data.append("upload", upload, upload.name);

	return {
		method: "POST",
		url: "resource_create",
		data,
	};
};