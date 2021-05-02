import {createContext} from "react";
import InputError from "./InputError";
import Label from "./Label";

export const InputGroupContext = createContext({name: null, error: false});

export default function InputGroup({name, label, error, children, className}) {
	name = name || label.toLowerCase() + "-" + Math.random().toString(36).substring(7);
	return (
		<div className={`flex flex-col ${className}`}>
			<Label input={name} hasError={error}>{label}</Label>
			<InputGroupContext.Provider value={{name, error}}>
				{children}
			</InputGroupContext.Provider>
			<InputError error={error}/>
		</div>
	);
}
