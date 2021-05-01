import {useContext, useEffect, useState} from "react"
import Button from "./Button"
import Input from "./Input"
import { InputGroupContext } from "./InputGroup"
import TrashIcon from "./TrashIcon"

export default function InputList({ name, error, defaultValue, addButtonText, onChange }) {
    const context = useContext(InputGroupContext)
    name = name || context.name
    error = error || context.error
    const [value, setValue] = useState(defaultValue || [])

    function onAddInput() {
        setValue((old) => old.concat({ value: null, error: false }))
    }

    function onChangeInput(index, newValue) {
        setValue((old) => {
            const newList = [...old];
            newList[index] = {
                ...newList[index],
                value: newValue
            }

            onChange(newList);
            return newList;
        });
    }

    function onRemoveInput(index) {
        setValue((old) => {
            const newValue = [...old]
            newValue.splice(index, 1)
            return newValue
        })
    }

    const count = value.length;

    return (
        <div className="flex flex-col">
            {value.map((option, i) => (
                <div key={i} className="flex flex-row mt-2">
                    <Input onChange={(e) => onChangeInput(i, e.target && e.target.value)} name={`${name}[${i}]`} defaultValue={option.value} error={error || option.error} rounded="rounded rounded-r-none" />
                    <Button color="red" px="4" rounded="rounded rounded-l-none" disabled={count <= 1} onClick={() => onRemoveInput(i)}>
                        <TrashIcon color="white" />
                    </Button>
                </div>
            ))}

            <div className="ml-auto py-2">
                <Button color="green" textSize="sm" onClick={onAddInput}>{addButtonText}</Button>
            </div>
        </div>
    )
}