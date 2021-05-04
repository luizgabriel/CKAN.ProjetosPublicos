import Input from "./Input";
import {useContext, useEffect, useRef, useState} from "react";
import CloseIcon from "./CloseIcon";
import Button from "./Button";
import {InputGroupContext} from "./InputGroup";
import {FormContext} from "./Form";

export default function TagsInput({name, error, onChange}) {
	const formContext = useContext(FormContext);
	const inputGroupContext = useContext(InputGroupContext);
	const inputRef = useRef();
	name = name || inputGroupContext.name;

	const onAddTag = () => {
		const tag = String(inputRef.current.value).trim();
		if (tag && tag !== "")
			setTags((currentTags) => [tag].concat(currentTags));
		inputRef.current.value = "";
	}

	const [tags, setTags] = useState([]);
	const onKeyDown = (e) => {
		if (["Enter", ",", ".", "|", ";"].indexOf(e.key) !== -1) {
			e.preventDefault();
			onAddTag();
		}
	};

	if (!onChange)
		onChange = (newTags) => formContext.onChange(name, newTags);

	useEffect(() => onChange(tags), [tags]);

	const onClickRemoveTag = (index) => {
		setTags(currentTags => {
			const newTags = [...currentTags];
			newTags.splice(index, 1);
			return newTags;
		});
	};

	return (
		<div className="flex flex-col w-full">
			<div className="w-full flex flex-row">
				<Input name={name} error={error} ref={inputRef} onChangeValue={() => {
				}} placeholder="Digite uma tag e aperte enter" onKeyDown={onKeyDown} rounded="rounded rounded-r-none"/>
				<Button color="green" className="rounded rounded-l-none" onClick={onAddTag}> + </Button>
			</div>
			<div className="flex flex-row mt-1">
				{tags.map((tag, i) => (
					<Button key={i} color="gray" onClick={() => onClickRemoveTag(i)} light className="px-3 py-1 text-sm mr-1">
						<span className="mr-2 text-gray-800">{tag}</span>
						<CloseIcon size="3"/>
					</Button>
				))}
			</div>
		</div>
	);
}
