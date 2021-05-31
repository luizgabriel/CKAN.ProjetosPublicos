import React, {useCallback} from "react";
import Container from "../components/Container";
import FormHeader from "../components/FormHeader";
import CreateProjectForm from "../components/CreateProjectForm";
import {sendRequest} from "../utils/request";
import slugify from "slugify";
import {createCkanRequest, createPackageRequest, createResourceRequest} from "../utils/ckan";
import {useCkanCredentials, useOrganizations, useTags} from "../utils/hooks";
import Header from "../components/Header";
import Box from "../components/Box";
import ErrorModal from "../components/ErrorModal";
import EmptyCredentialsModal from "../components/EmptyCredentialsModal";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useTranslation} from "next-i18next";

function parseDescription(data, t) {
	const objectivesTitle = t("objectives_label");
	const metaDataTitle = t("other_infos_label");
	const benefitsTitle = t("benefit_label");
	const observationsTitle = t("observations_label");

	const nonEmptyString = (str) => str && String(str).trim() !== "";

	let description = data.description;

	const objectives = (data.objectives || []).filter((item) => nonEmptyString(item.value));
	if (objectives.length > 0) {
		let objectivesText = `\n\n#### ${objectivesTitle}\n`;
		for (const objective of objectives) {
			objectivesText += `- ${objective.value}\n`;
		}

		description += objectivesText;
	}

	if (nonEmptyString(data.benefit)) {
		description += `\n\n#### ${benefitsTitle}\n${data.benefit}`;
	}

	if (nonEmptyString(data.observations)) {
		description += `\n\n#### ${observationsTitle}\n${data.observations}`;
	}

	const metaData = (data.metaData || []).filter((item) => nonEmptyString(item.name));
	if (metaData.length > 0) {
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
function mapFormDataToCreatePackagePayload(data, t) {
	return {
		name: slugify(data.name.toLowerCase()).slice(0, 100),
		title: data.name,
		private: false,
		notes: parseDescription(data, t),
		tags: data.categories.map((item) => ({
			name: slugify(item).slice(0, 100),
		})),
		owner_org: data.organization,
		groups: [
			{
				name: "acompanhamento-de-projetos"
			}
		]
	};
}

const createPackage = async (data, ckanServer, apiKey, t, onUpdateProgress) => {
	const ckanMakeRequest = createCkanRequest(ckanServer, apiKey);
	const total = 1 + data.images.length + data.files.length;
	let current = 0;

	onUpdateProgress(0);
	const packageData = await sendRequest(
		ckanMakeRequest(
			createPackageRequest(
				mapFormDataToCreatePackagePayload(data, t)
			)
		)
	);
	onUpdateProgress(current++ / total);

	for (const image of data.images) {
		try {
			await sendRequest(
				ckanMakeRequest(
					createResourceRequest(
						image.file, packageData.id
					)
				)
			);
			onUpdateProgress(current++ / total);
		} catch (e) {
			console.error(e);
		}
	}

	for (const file of data.files) {
		try {
			await sendRequest(
				ckanMakeRequest(
					createResourceRequest(
						file, packageData.id
					)
				)
			);
			onUpdateProgress(current++ / total);
		} catch (e) {
			console.error(e);
		}
	}

	return packageData;
};


export default function CreateProject() {
	const {t} = useTranslation("common");

	const [ckanCredentials, loadingCkanCredentials] = useCkanCredentials();
	const emptyCredentials = !loadingCkanCredentials && (!ckanCredentials.host || !ckanCredentials.apiKey);

	const [tags,] = useTags(ckanCredentials.host, ckanCredentials.apiKey);

	const [organizations, loadingOrganizations] = useOrganizations(ckanCredentials.host, ckanCredentials.apiKey);
	const onSubmit = useCallback(async (data, onUpdateProgress) => {
		if (ckanCredentials && !loadingCkanCredentials) {
			const response = await createPackage(data, ckanCredentials.host, ckanCredentials.apiKey, t, onUpdateProgress);
			window.location = ckanCredentials.host + "dataset/" + response.id;
		}
	}, [ckanCredentials, loadingCkanCredentials]);

	const emptyOrganizations = !emptyCredentials && !loadingOrganizations && organizations.length === 0;

	return (
		<>
			<Head>
				<title>{t("title")}</title>
			</Head>
			<Header baseUrl={ckanCredentials.host} />
			<Container>
				{emptyCredentials ? <EmptyCredentialsModal /> : null}
				{emptyOrganizations ? <ErrorModal/> : null}
				<Box>
					<FormHeader
						title={t("form_title")}
						description={t("form_description")}/>

					<CreateProjectForm
						organizations={organizations}
						loadingOrganizations={loadingOrganizations}
						tags={tags}
						onSubmit={onSubmit}/>
				</Box>
			</Container>
		</>
	);
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, []),
	},
})