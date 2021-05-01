import React, {useEffect, useState} from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import FormBody from "../components/FormBody";
import FormHeader from "../components/FormHeader";
import Input from "../components/Input";
import InputGroup from "../components/InputGroup";
import InputList from "../components/InputList";
import TextArea from "../components/TextArea";
import FileUpload from "../components/FileUpload";

export default function CreateProject() {
	const [name, setName] = useState(null);
	const [description, setDescription] = useState(null);
	const [objectives, setObjectives] = useState([{value: "", error: false}]);
	const [metaData, setMetaData] = useState([{value: "", error: false}]);
	const [images, setImages] = useState([]);

	useEffect(() => {
		console.log({
			name,
			description,
			objectives,
			metaData,
			images
		});
	}, [name, description, objectives, metaData, images]);

	return (
		<Container>
			<FormHeader
				title="Projetos Públicos"
				description="Cadastre um novo projeto público no Dataurbe"/>

			<FormBody>
				<div className="p-2 w-full">
					<div className="relative">
						<InputGroup name="name" label="Nome">
							<Input defaultValue={name} onChangeValue={setName}/>
						</InputGroup>
					</div>
				</div>
				<div className="p-2 w-full">
					<div className="relative">
						<InputGroup name="description" label="Descrição">
							<TextArea defaultValue={description} onChangeValue={setDescription}/>
						</InputGroup>
					</div>
				</div>
				<div className="p-2 w-full">
					<div className="relative">
						<InputGroup name="objectives" label="Objetivos">
							<InputList defaultValue={objectives} onChange={setObjectives}
								addButtonText="Adicionar Objetivo"/>
						</InputGroup>
					</div>
				</div>
				<div className="p-2 w-full">
					<div className="relative">
						<InputGroup name="objectives" label="Outras informações">
							<InputList defaultValue={metaData} onChange={setMetaData} addButtonText="Adicionar"/>
						</InputGroup>
					</div>
				</div>
				<div className="p-2 w-full">
					<div className="relative">
						<InputGroup name="images" label="Imagens">
							<FileUpload onChange={setImages}/>
						</InputGroup>
					</div>
				</div>
				<div className="border-t border-gray-200 w-full my-4"/>
				<div className="p-2 w-full text-center">
					<Button color="blue" textSize="xl" className="mx-auto px-8 mb-2">Cadastrar no Dataurbe</Button>
					<span
						className="text-gray-500 text-sm">Clique para cadastrar este projeto público no Dataurbe</span>
				</div>
			</FormBody>
		</Container>
	);
}
