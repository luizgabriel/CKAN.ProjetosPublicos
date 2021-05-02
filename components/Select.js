import {useContext, useEffect, useState} from "react";
import {InputGroupContext} from "./InputGroup";
import {FormContext} from "./Form";

export default function Select({name, error, options, unselectedText, onChange, ...rest}) {
	const inputGroupContext = useContext(InputGroupContext);
	const formContext = useContext(FormContext);
	const [selectedOption, setSelectedOption] = useState(null);

	name = name || inputGroupContext.name;
	error = error || inputGroupContext.error;
	if (!onChange)
		onChange = (value) => formContext.onChange(name, value);

	useEffect(() => onChange(selectedOption), [selectedOption]);

	const onChangeSelectInput = (e) => {
		setSelectedOption(e.target.value);
	};

	return (
		<select
			id={name}
			name={name}
			onChange={onChangeSelectInput}
			{...rest}
			className={`w-full bg-gray-100 bg-opacity-50 rounded border focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out ${error ? "border-red-700" : "border-gray-300"}`}>
			<option selected={selectedOption === null}>{unselectedText}</option>
			{options.map((option, i) => (
				<option key={i} value={option.value} selected={selectedOption === option.value}>{option.name}</option>
			))}
		</select>
	);
}