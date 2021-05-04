import React, {useCallback} from "react";
import Container from "../components/Container";
import FormHeader from "../components/FormHeader";
import CreateProjectForm from "../components/CreateProjectForm";
import {sendRequest} from "../utils/request";
import slugify from "slugify";
import {createCkanRequest, createPackageRequest, createResourceRequest} from "../utils/ckan";
import {useCkanCredentials, useOrganizations} from "../utils/hooks";

function parseDescription(data) {
	const objectivesTitle = "Objetivos";
	const metaDataTitle = "Informações Extra";
	const benefitsTitle = "Benefício / Beneficiários";

	const nonEmptyString = (str) => str && String(str).trim() !== "";

	let description = data.description;

	if (nonEmptyString(data.benefit)) {
		description += `\n\n#### ${benefitsTitle}\n${data.benefit}`;
	}

	const objectives = data.objectives.filter(nonEmptyString);
	if (objectives && objectives.length > 0) {
		let objectivesText = `\n\n#### ${objectivesTitle}\n`;
		for (const objective of objectives) {
			objectivesText += `- ${objective.value}\n`;
		}

		description += objectivesText;
	}

	const metaData = data.metaData.filter((item) => nonEmptyString(item.name));
	if (metaData && metaData.length > 0) {
		let metaDataText = `\n\n\n#### ${metaDataTitle}\n`;
		for (const metaItem of metaData) {
			metaDataText += `- __${metaItem.name}__: ${metaItem.value}\n`;
		}

		description += metaDataText;
	}

	return description;
}

/**
 * name (string) – the name of the new dataset, must be between 2 and 100 characters long and contain only lowercase alphanumeric characters, - and _, e.g. 'warandpeace'
title (string) – the title of the dataset (optional, default: same as name)
private (bool) – If True creates a private dataset
author (string) – the name of the dataset’s author (optional)
author_email (string) – the email address of the dataset’s author (optional)
maintainer (string) – the name of the dataset’s maintainer (optional)
maintainer_email (string) – the email address of the dataset’s maintainer (optional)
license_id (license id string) – the id of the dataset’s license, see license_list() for available values (optional)
notes (string) – a description of the dataset (optional)
url (string) – a URL for the dataset’s source (optional)
version (string, no longer than 100 characters) – (optional)
state (string) – the current state of the dataset, e.g. 'active' or 'deleted', only active datasets show up in search results and other lists of datasets, this parameter will be ignored if you are not authorized to change the state of the dataset (optional, default: 'active')
type (string) – the type of the dataset (optional), IDatasetForm plugins associate themselves with different dataset types and provide custom dataset handling behaviour for these types
resources (list of resource dictionaries) – the dataset’s resources, see resource_create() for the format of resource dictionaries (optional)
tags (list of tag dictionaries) – the dataset’s tags, see tag_create() for the format of tag dictionaries (optional)
extras (list of dataset extra dictionaries) – the dataset’s extras (optional), extras are arbitrary (key: value) metadata items that can be added to datasets, each extra dictionary should have keys 'key' (a string), 'value' (a string)
relationships_as_object (list of relationship dictionaries) – see package_relationship_create() for the format of relationship dictionaries (optional)
relationships_as_subject (list of relationship dictionaries) – see package_relationship_create() for the format of relationship dictionaries (optional)
groups (list of dictionaries) – the groups to which the dataset belongs (optional), each group dictionary should have one or more of the following keys which identify an existing group: 'id' (the id of the group, string), or 'name' (the name of the group, string), to see which groups exist call group_list()
owner_org (string) – the id of the dataset’s owning organization, see organization_list() or organization_list_for_user() for available values (optional)
 */
function mapFormDataToCreatePackagePayload(data) {
	console.log({data});
	return {
		name: slugify(data.name).slice(0, 100),
		title: data.name,
		private: false,
		notes: parseDescription(data),
		tags: data.categories.map((item) => ({
			name: slugify(item).slice(0, 100),
		})),
		owner_org: data.organization,
	};
}

const createPackage = async (data, ckanServer, apiKey) => {
	const packageData = await sendRequest(
		createCkanRequest(ckanServer, apiKey)(
			createPackageRequest(
				mapFormDataToCreatePackagePayload(data)
			)
		)
	);

	await Promise.all(data.images.map(image => {
		return sendRequest(
			createCkanRequest(ckanServer, apiKey)(
				createResourceRequest(
					image.file, packageData.id
				)
			)
		)
	}))

	return packageData;
};

export default function CreateProject() {
	const [ckanCredentials, loadingCkanCredentials] = useCkanCredentials();
	const [organizations, loadingOrganizations] = useOrganizations(ckanCredentials.host, ckanCredentials.apiKey);
	const onSubmit = useCallback(async (data) => {
		if (ckanCredentials && !loadingCkanCredentials) {
			const response = await createPackage(data, ckanCredentials.host, ckanCredentials.apiKey);
			window.open(ckanCredentials.host + "dataset/" + response.id);
		}
	}, [ckanCredentials, loadingCkanCredentials]);

	return (
		<Container>
			<FormHeader
				title="Projetos Públicos"
				description="Cadastre um novo projeto público no Dataurbe"/>

			<CreateProjectForm
				organizations={organizations}
				loadingOrganizations={loadingOrganizations}
				onSubmit={onSubmit}/>
		</Container>
	);
}