import {createContext, useCallback, useEffect, useState} from "react";

export const FormContext = createContext({
	data: {},
	onChange: () => {
		// Do nothing
	}
});

export default function Form({initialData, children, onChange}) {
	const [data, setData] = useState(initialData || {});
	const onChangeData = useCallback((name, value) => {
		setData((oldData) => ({
			...oldData,
			[name]: value
		}));
	}, [data]);

	useEffect(() => onChange(data), [data]);

	return (
		<FormContext.Provider value={{data, onChange: onChangeData}}>
			{children}
		</FormContext.Provider>
	);
}