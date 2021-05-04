import {useContext, useEffect, useState} from "react";
import Button from "./Button";
import Input from "./Input";
import {InputGroupContext} from "./InputGroup";
import {FormContext} from "./Form";
import CloseIcon from "./CloseIcon";

export default function MetaInputList({name, error, defaultValue, addButtonText, onChange}) {
	const inputGroupContext = useContext(InputGroupContext);
	const formContext = useContext(FormContext);
	name = name || inputGroupContext.name;
	error = error || inputGroupContext.error;
	const [value, setValue] = useState(defaultValue || [{
		name: "",
		value: "",
		error: false
	}]);

	if (!onChange) {
		onChange = (value) => formContext.onChange(name, value);
	}

	function onAddInput() {
		setValue((old) => old.concat({name: "", value: "", error: false}));
	}

	function onChangeInput(index, newValue, key) {
		setValue((old) => {
			const newList = [...old];
			newList[index] = {
				...newList[index],
				[key]: newValue
			};
			return newList;
		});
	}

	function onRemoveInput(index) {
		setValue((old) => {
			const newValue = [...old];
			newValue.splice(index, 1);
			return newValue;
		});
	}

	useEffect(() => onChange(value), [value]);

	const count = value.length;

	return (
		<div className="flex flex-col">
			{value.map((option, i) => (
				<div key={i} className="flex flex-row mt-2">
					<div className="flex flex-row w-full text-sm">
						<Input onChangeValue={(value) => onChangeInput(i, value, "name")} name={`${name}[${i}][name]`} defaultValue={option.name} placeholder="Nome" error={error || option.error} rounded="rounded rounded-r-none" width="7/12"/>
						<Input onChangeValue={(value) => onChangeInput(i, value, "value")} name={`${name}[${i}][value]`} defaultValue={option.value} placeholder="Valor" error={error || option.error} rounded="rounded-none" width="5/12"/>
					</div>
					<Button color="gray" light px="4" rounded="rounded rounded-l-none" disabled={count <= 1}
						onClick={() => onRemoveInput(i)}>
						<CloseIcon size="4"/>
					</Button>
				</div>
			))}

			<div className="ml-auto py-2">
				<Button color="green" textSize="sm" onClick={onAddInput}>{addButtonText}</Button>
			</div>
		</div>
	);
}