import {forwardRef, useContext} from "react";
import {InputGroupContext} from "./InputGroup";
import {FormContext} from "./Form";

function Input({type, name, error, rounded, hidden, onChangeValue, width, ...rest}, ref) {
	const inputGroupContext = useContext(InputGroupContext);
	const formContext = useContext(FormContext);
	type = type || "text";
	name = name || inputGroupContext.name;
	error = error || inputGroupContext.error;
	rounded = rounded || "rounded";
	width = width || "full";

	if (!(onChangeValue || rest.onChange))
		onChangeValue = (value) => formContext.onChange(name, value);

	if (!rest.defaultValue && type !== "file") {
		rest.defaultValue = formContext.data[name];
	}

	return (
		<input
			type={type}
			id={name}
			name={name}
			ref={ref}
			{...(onChangeValue ? ({onChange: (e) => onChangeValue(e.target.value)}) : {})}
			{...rest}
			className={`w-${width} bg-gray-100 bg-opacity-50 ${rounded} border ${hidden ? "hidden" : ""} focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${error ? "border-red-700" : "border-gray-300"}`}/>
	);
}

export default forwardRef(Input);