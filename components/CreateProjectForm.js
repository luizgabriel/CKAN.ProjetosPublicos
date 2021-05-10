import FormBody from "./FormBody";
import InputGroup from "./InputGroup";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";
import InputList from "./InputList";
import FileUpload from "./FileUpload";
import Button from "./Button";
import LoadingIcon from "./LoadingIcon";
import Form from "./Form";
import React, {useCallback, useEffect, useRef, useState} from "react";
import TagsInput from "./TagsInput";
import MetaInputList from "./MetaInputList";
import InputError from "./InputError";

const requiredMessage = (fieldName) => `O campo "${fieldName}" é obrigatório`;

const validateData = (data) => {
	const errors = {};
	if (!data.name)
		errors.name = requiredMessage("nome");

	if (!data.organization)
		errors.organization = "Selecione uma organização";

	if (!data.description)
		errors.description = requiredMessage("descrição");

	if (!data.categories || !data.categories.length > 0)
		errors.categories = "É necessário adicionar ao menos uma categoria";

	if (!data.benefit)
		errors.benefit = requiredMessage("benefício e beneficiário");

	return errors;
};

export default function CreateProjectForm({initialData, organizations, loadingOrganizations, onSubmit}) {
	const [data, setData] = useState(initialData || {});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const nameInputRef = useRef();
	const benefitInputRef = useRef();

	const onClickSubmit = useCallback(() => {
		setLoading(true);
		const validationErrors = validateData(data);

		if (Object.entries(validationErrors).length > 0) {
			setLoading(false);
			setErrors(validationErrors);

			if (validationErrors.name && nameInputRef.current && nameInputRef.current.scrollIntoView)
				nameInputRef.current.scrollIntoView({behavior: "smooth", block: "center"});

		} else {
			setErrors({});
			onSubmit(data)
				.catch((e) => {
					console.error(e);
					setErrors({name: "Não foi possível cadastrar este projeto. Este nome já está em uso!"});
				})
				.finally(() => setLoading(false));
		}
	}, [data]);

	useEffect(() => {
		if (errors.name && nameInputRef.current && nameInputRef.current.scrollIntoView)
			nameInputRef.current.scrollIntoView({behavior: "smooth", block: "center"});
		else if (errors.benefit && benefitInputRef.current && benefitInputRef.current.scrollIntoView)
			benefitInputRef.current.scrollIntoView({behavior: "smooth", block: "center"});

	}, [errors, nameInputRef, benefitInputRef]);

	return (
		<Form onChange={setData} errors={errors}>
			<FormBody>
				<InputGroup name="name" label="Nome" className="p-2 w-full">
					<Input ref={nameInputRef}/>
				</InputGroup>
				<InputGroup name="organization" label="Organização" className="p-2 w-full">
					<Select options={organizations}
					        unselectedText={"Selecione uma organização" + (loadingOrganizations ? " (carregando...)" : "")}/>
				</InputGroup>
				<InputGroup name="description" label="Descrição" className="p-2 w-full">
					<TextArea rows="4"/>
				</InputGroup>
				<InputGroup name="objectives" label="Objetivos" className="p-2 w-full">
					<InputList addButtonText="Adicionar Objetivo"/>
				</InputGroup>
				<InputGroup name="benefit" label="Benefício / Beneficiários" className="p-2 w-full">
					<TextArea rows="2" ref={benefitInputRef}/>
				</InputGroup>
				<InputGroup name="metaData" label="Outras informações" className="p-2 w-full">
					<MetaInputList addButtonText="Adicionar" defaultValue={[
						{name: "Data de início do projeto", value: "", error: false},
						{name: "Fim estimado", value: "", error: false},
						{name: "Tempo estimado (dias úteis)", value: "357", error: false},
						{name: "Estado do projeto", value: "", error: false},
						{name: "Licitação", value: "100%", error: false},
						{name: "Execução", value: "100%", error: false},
						{name: "Endereço", value: "", error: false},
					]}/>
				</InputGroup>
				<InputGroup name="categories" label="Categorias" className="p-2 w-full">
					<TagsInput/>
				</InputGroup>
				<InputGroup name="images" label="Imagens" className="p-2 w-full">
					<FileUpload/>
				</InputGroup>
				<div className="border-t border-gray-200 w-full my-4"/>
				<div className="p-2 w-full flex flex-col items-center justify-center">
					<Button color="blue" textSize="xl" className="mx-auto px-8 mb-2" onClick={onClickSubmit}>
						{loading ? <LoadingIcon className="mr-2" size="4"/> : null}
						Cadastrar no Dataurbe
					</Button>
					{Object.entries(errors).length > 0 ?
						(<InputError
							error="Alguns campos obrigatórios não foram preenchidos. Por favor, corrija-os antes de enviar."/>)
						: (
							<span className="text-gray-500 text-sm text-center">
								Clique para cadastrar este projeto público no Dataurbe
							</span>
						)}
				</div>
			</FormBody>
		</Form>
	);
}