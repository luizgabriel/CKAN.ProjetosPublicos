import Input from "./Input";
import CloseIcon from "./CloseIcon";
import LoadingIcon from "./LoadingIcon";
import PictureIcon from "./PictureIcon";
import Button from "./Button";
import {useContext, useEffect, useRef, useState} from "react";
import {FormContext} from "./Form";
import {InputGroupContext} from "./InputGroup";

/**
 * @param file {File}
 * @returns {string | ArrayBuffer}
 */
function readFileAsDataURL(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

export default function ImagesUpload({name, onChange}) {
	const inputGroupContext = useContext(InputGroupContext);
	const formContext = useContext(FormContext);
	name = name || inputGroupContext.name;

	const fileInputRef = useRef();
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);

	if (!onChange) {
		onChange = (value) => formContext.onChange(name, value);
	}

	const onClickOpenFile = () => fileInputRef.current.click();
	const onChangeFiles = () => {
		setLoading(true);
		Promise.all(
			Array.from(fileInputRef.current.files).map(async (file) => ({
				file,
				dataUrl: await readFileAsDataURL(file)
			}))
		)
			.then(newFiles => {
				setLoading(false);
				setFiles((oldFiles) => newFiles.concat(oldFiles));
			});
	};

	const onClickRemoveFile = (index) => {
		setFiles((oldFiles) => {
			const newFiles = [...oldFiles];
			newFiles.splice(index, 1);
			return newFiles;
		});
	};

	useEffect(() => {
		onChange(files);
	}, [files]);

	return (
		<div className="flex flex-col">

			<Input type="file" ref={fileInputRef} onChange={onChangeFiles} accept="image/*" multiple hidden/>

			<div className="flex flex-row">

				{files.slice(0, 3).map((file, i) => (
					<button key={i}
						className="flex items-center justify-center rounded w-1/2 sm:w-1/3 md:w-1/4 bg-gray-600 overflow-hidden mr-2 h-50 relative"
						onClick={() => onClickRemoveFile(i)}>
						<CloseIcon size="4"
							className="absolute top-2 right-2 z-30 text-white bg-gray-800 rounded-full p-0.5 shadow-sm cursor-pointer"/>
						<img src={file.dataUrl} alt="" className="w-full"/>
					</button>
				))}

				{files.length > 4 ? (
					<div
						className="flex items-center justify-center rounded w-1/2 sm:w-1/3 md:w-1/4 bg-gray-500 overflow-hidden p-4 mr-2 text-white h-50">
                        E mais {files.length - 3} imagens...
					</div>
				) : null}

				<div className="flex flex-col rounded w-1/2 sm:w-1/3 md:w-1/4 overflow-hidden cursor-pointer"
					onClick={onClickOpenFile}>
					<div className="p-4 flex flex-col items-center justify-center bg-gray-300 text-white h-40">
						{loading ? <LoadingIcon size="10"/> : <PictureIcon size="10"/>}
					</div>
					<Button color="blue" textSize="sm" rounded="rounded rounded-t-none" className="w-full">
                        Anexar imagem
					</Button>
				</div>
			</div>

		</div>
	);
};