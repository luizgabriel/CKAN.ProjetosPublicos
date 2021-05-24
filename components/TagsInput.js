import Input from "./Input";
import {useContext, useEffect, useRef, useState} from "react";
import CloseIcon from "./CloseIcon";
import Button from "./Button";
import {InputGroupContext} from "./InputGroup";
import {FormContext} from "./Form";
import ArrowRightIcon from "./ArrowRightIcon";
import FuzzySearch from "fuzzy-search";

export default function TagsInput({name, error, options, onChange}) {
	const formContext = useContext(FormContext);
	const inputGroupContext = useContext(InputGroupContext);
	const inputRef = useRef();
	const [suggestions, setSuggestions] = useState([]);
	name = name || inputGroupContext.name;

	const searcher = new FuzzySearch(options, {
		caseSensitive: true,
	});

	const onAddTag = () => {
		const tag = String(inputRef.current.value).trim();
		if (tag && tag !== "")
			setTags((currentTags) => [tag].concat(currentTags));
		inputRef.current.value = "";
		setSuggestions([]);
	};

	const [tags, setTags] = useState([]);
	const onKeyDown = (e) => {
		if (["Enter", ",", ".", "|", ";"].indexOf(e.key) !== -1) {
			e.preventDefault();
			onAddTag();
		}
	};

	if (!onChange)
		onChange = (newTags) => formContext.onChange(name, newTags);

	useEffect(() => onChange(tags), [tags]);

	const onClickRemoveTag = (index) => {
		setTags(currentTags => {
			const newTags = [...currentTags];
			newTags.splice(index, 1);
			return newTags;
		});
	};

	const onChangeSearch = (search) => {
		if (search.length > 0) {
			setSuggestions(searcher.search(search));
		} else {
			setSuggestions([]);
		}
	};

	const onOptionKeyDown = (suggestion) => (e) => {
		if (e.key === "Enter") {
			onClickSuggestion(suggestion)(e);
		}
	};

	const onClickSuggestion = (suggestion) => (e) => {
		e.preventDefault();
		inputRef.current.value = suggestion;
		onAddTag();
	};

	return (
		<div className="flex flex-col w-full relative">
			<div className="w-full flex flex-row">
				<Input name={name} error={error} ref={inputRef} onChangeValue={onChangeSearch} placeholder="Digite uma tag e aperte enter" onKeyDown={onKeyDown} rounded="rounded rounded-r-none"/>
				<Button color="green" className="rounded rounded-l-none" onClick={onAddTag}> + </Button>
			</div>
			{suggestions.length > 0 ? (
				<ul className="bg-white border border-gray-100 w-full top-10 mt-2 absolute">
					{suggestions.slice(0, 10).map((suggestion, i) => (
						<li key={i} className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900" onClick={onClickSuggestion(suggestion)} onKeyDown={onOptionKeyDown(suggestion)} tabIndex={0}>
							<ArrowRightIcon size="4" className="left-2 top-2" />
							{suggestion}
						</li>
					))}
				</ul>
			) : null}
			<div className="flex flex-row flex-wrap mt-1">
				{tags.map((tag, i) => (
					<Button key={i} color="gray" onClick={() => onClickRemoveTag(i)} light className="px-3 py-1 text-sm mr-1 mt-1">
						<span className="mr-2 text-gray-800">{tag}</span>
						<CloseIcon size="3"/>
					</Button>
				))}
			</div>
		</div>
	);
}
