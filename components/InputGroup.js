import { createContext } from "react";
import InputError from "./InputError";
import Label from "./Label";

export const InputGroupContext = createContext({ name: null, error: false });

export default function InputGroup({ name, label, error, children }) {
    return (
        <>
            <Label input={name} hasError={error}>{label}</Label>
            <InputGroupContext.Provider value={{ name, error }}>
                {children}
            </InputGroupContext.Provider>
            <InputError error={error} />
        </>
    )
}
