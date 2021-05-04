import {createContext, useCallback, useEffect, useState} from "react";

export const FormContext = createContext({
	data: {},
	errors: {},
	onChange: () => {
		// Do nothing
	}
});

export default function Form({initialData, errors, children, onChange}) {
	errors = errors || {};

	const [data, setData] = useState(initialData || {});
	const onChangeData = useCallback((name, value) => {
		setData((oldData) => ({
			...oldData,
			[name]: value
		}));
	}, [data]);

	useEffect(() => onChange(data), [data]);

	return (
		<FormContext.Provider value={{data, errors, onChange: onChangeData}}>
			{children}
		</FormContext.Provider>
	);
}