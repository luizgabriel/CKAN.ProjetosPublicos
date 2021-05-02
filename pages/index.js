import React, {useCallback, useEffect, useState} from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import FormBody from "../components/FormBody";
import FormHeader from "../components/FormHeader";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";
import InputList from "../components/InputList";
import TextArea from "../components/TextArea";
import FileUpload from "../components/FileUpload";
import axios from "axios";
import LoadingIcon from "../components/LoadingIcon";
import Form from "../components/Form";
import Select from "../components/Select";

const CKAN_SERVER = "https://a75c9042-d964-4434-b957-d180f61c1a3d.mock.pstmn.io";
const CKAN_API_KEY = "";

function createCkanRequest(config, ckanServer = CKAN_SERVER, apiKey = CKAN_API_KEY) {
	return {
		baseURL: ckanServer + "/api/action/",
		headers: {
			Authorization: apiKey,
		},
		...config,
	}
}

async function sendRequest(config) {
	const response = await axios(config);
	return response.data;
}

async function getOrganizations() {
	const response = await sendRequest(createCkanRequest({
		method: "GET",
		url: "organization_list",
		params: {
			all_fields: true
		}
	}));

	return response.result;
}

async function createPackage(data) {
	return await sendRequest(createCkanRequest({
		method: "POST",
		url: "package_create",
		data,
	}));
}

function mapOrganizationToOption(organization) {
	return {
		name: organization.display_name,
		value: organization.name
	};
}

function mapFormDataToCreatePackagePayload(data) {
	console.log(data);
	return {};
}

export default function CreateProject() {
	const [data, setData] = useState({});
	const [organizations, setOrganizations] = useState([]);
	const [loading, setLoading] = useState(false);

	const onClickRegister = useCallback(async () => {
		setLoading(true);
		try {
			await createPackage(mapFormDataToCreatePackagePayload(data));
		} catch (e) {
		}
		setLoading(false);
	}, [data]);

	useEffect(() => {
		getOrganizations().then((orgs) => setOrganizations(orgs.map(mapOrganizationToOption)));
	}, []);

	return (
		<Container>
			<FormHeader
				title="Projetos Públicos"
				description="Cadastre um novo projeto público no Dataurbe"/>

			<Form onChange={setData}>
				<FormBody>
					<InputGroup name="name" label="Nome" className="p-2 w-full">
						<Input/>
					</InputGroup>
					<InputGroup name="organization" label="Organização" className="p-2 w-full">
						<Select options={organizations} unselectedText="Selecione uma organização"/>
					</InputGroup>
					<InputGroup name="description" label="Descrição" className="p-2 w-full">
						<TextArea/>
					</InputGroup>
					<InputGroup name="objetives" label="Objetivos" className="p-2 w-full">
						<InputList addButtonText="Adicionar Objetivo"/>
					</InputGroup>
					<InputGroup name="metaData" label="Outras informações" className="p-2 w-full">
						<InputList addButtonText="Adicionar"/>
					</InputGroup>
					<InputGroup name="images" label="Imagens" className="p-2 w-full">
						<FileUpload/>
					</InputGroup>
					<div className="border-t border-gray-200 w-full my-4"/>
					<div className="p-2 w-full flex flex-col items-center justify-center">
						<Button color="blue" textSize="xl" className="mx-auto px-8 mb-2" onClick={onClickRegister}>
							{loading ? <LoadingIcon className="mr-2"/> : null}
							Cadastrar no Dataurbe
						</Button>
						<span className="text-gray-500 text-sm text-center">
							Clique para cadastrar este projeto público no Dataurbe
						</span>
					</div>
				</FormBody>
			</Form>
		</Container>
	);
}
