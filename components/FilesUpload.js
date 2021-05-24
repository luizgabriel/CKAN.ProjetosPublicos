import Input from "./Input";
import {useContext, useEffect, useRef, useState} from "react";
import {FormContext} from "./Form";
import {InputGroupContext} from "./InputGroup";
import Button from "./Button";


export default function FilesUpload({name, placeholder, onChange}) {
	const inputGroupContext = useContext(InputGroupContext);
	const formContext = useContext(FormContext);
	name = name || inputGroupContext.name;

	const fileInputRef = useRef();
	const [files, setFiles] = useState([]);

	if (!onChange) {
		onChange = (value) => formContext.onChange(name, value);
	}

	const onClickOpenFile = () => fileInputRef.current.click();
	const onChangeFiles = () => {
		setFiles(Array.from(fileInputRef.current.files));
	};

	useEffect(() => {
		onChange(files);
	}, [files]);

	let placeholderMessage = placeholder;
	if (files.length === 1)
		placeholderMessage = "1 arquivo anexado";
	else if (files.length > 1)
		placeholderMessage = files.length + " arquivos anexados";

	return (
		<div className="flex flex-col">

			<Input type="file" ref={fileInputRef} onChange={onChangeFiles} multiple hidden/>

			<div className="flex flex-row">
				<Button color="blue" textSize="sm" className="rounded-r-none w-1/4" onClick={onClickOpenFile}>Anexar arquivos</Button>
				<div className="w-full bg-gray-100 bg-opacity-50 rounded-l-none rounded-r border focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
					<div className="flex flex-row flex-wrap items-center h-full">
						<span className="text-xs text-gray-400">{placeholderMessage}</span>
					</div>
				</div>
			</div>

			<ul className="flex flex-col list-disc ml-4 mt-1">
				{files.map((file, i) => (
					<li key={i} className="text-xs text-gray-400 mt-2">{file.name}</li>
				))}
			</ul>

		</div>
	);
}