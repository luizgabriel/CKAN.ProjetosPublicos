import {useContext} from "react";
import {InputGroupContext} from "./InputGroup";

export default function TextArea({name, error, onChangeValue, ...rest}) {
	const context = useContext(InputGroupContext);
	name = name || context.name;
	error = error || context.error;
	return (
		<textarea
			id={name}
			name={name}
			{...(onChangeValue ? ({onChange: (e) => onChangeValue(e.target.value)}) : {})}
			{...rest}
			className={`w-full bg-gray-100 bg-opacity-50 rounded border focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out ${error ? "border-red-700" : "border-gray-300"}`}/>
	);
}
