import {useContext} from "react";
import {InputGroupContext} from "./InputGroup";
import {FormContext} from "./Form";

export default function TextArea({name, error, onChangeValue, ...rest}) {
	const inputGroupContext = useContext(InputGroupContext);
	const formContext = useContext(FormContext);

	name = name || inputGroupContext.name;
	error = error || inputGroupContext.error;
	if (!(onChangeValue || rest.onChange))
		onChangeValue = (value) => formContext.onChange(name, value);

	if (!rest.defaultValue)
		rest.defaultValue = formContext.data[name];

	return (
		<textarea
			id={name}
			name={name}
			{...(onChangeValue ? ({onChange: (e) => onChangeValue(e.target.value)}) : {})}
			{...rest}
			className={`w-full bg-gray-100 bg-opacity-50 rounded border focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 resize-y leading-6 transition-colors duration-200 ease-in-out ${error ? "border-red-700" : "border-gray-300"}`}/>
	);
}
