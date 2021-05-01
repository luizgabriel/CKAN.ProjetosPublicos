import {useContext} from "react";
import {InputGroupContext} from "./InputGroup";

export default function Label({name, error, children}) {
	const context = useContext(InputGroupContext);
	name = name || context.name;
	error = error || context.error;

	return (
		<label htmlFor={name}
			className={`leading-7 text-sm ${error ? "text-red-600" : "text-gray-600"}`}>{children}</label>
	);
}