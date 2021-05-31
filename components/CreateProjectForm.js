import FormBody from "./FormBody";
import InputGroup from "./InputGroup";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";
import InputList from "./InputList";
import ImagesUpload from "./ImagesUpload";
import Button from "./Button";
import LoadingIcon from "./LoadingIcon";
import Form from "./Form";
import React, {useCallback, useEffect, useRef, useState} from "react";
import TagsInput from "./TagsInput";
import MetaInputList from "./MetaInputList";
import InputError from "./InputError";
import FilesUpload from "./FilesUpload";
import {useTranslation} from "next-i18next";
import ProgressBar from "./ProgressBar";

const validateData = (data, t) => {
	const errors = {};
	if (!data.name)
		errors.name = t("name_required");

	if (!data.organization)
		errors.organization = t("city_required");

	if (!data.description)
		errors.description = t("description_required");

	if (!data.categories || !data.categories.length > 0)
		errors.categories = t("categories_required");

	return errors;
};

export default function CreateProjectForm({initialData, organizations, tags, loadingOrganizations, onSubmit}) {
	const [data, setData] = useState(initialData || {});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [progressValue, setProgressValue] = useState(0);
	const {t} = useTranslation("common");

	const nameInputRef = useRef();

	const onClickSubmit = useCallback(() => {
		setLoading(true);
		const validationErrors = validateData(data, t);

		if (Object.entries(validationErrors).length > 0) {
			setLoading(false);
			setErrors(validationErrors);

			if (validationErrors.name && nameInputRef.current && nameInputRef.current.scrollIntoView)
				nameInputRef.current.scrollIntoView({behavior: "smooth", block: "center"});

		} else {
			setErrors({});
			onSubmit(data, setProgressValue)
				.catch((e) => {
					console.error(e);
					setErrors({
						name: t("create_project_error")
					});
				})
				.finally(() => setLoading(false));
		}
	}, [data]);

	useEffect(() => {
		if (errors.name && nameInputRef.current && nameInputRef.current.scrollIntoView)
			nameInputRef.current.scrollIntoView({behavior: "smooth", block: "center"});
	}, [errors, nameInputRef]);

	return (
		<Form onChange={setData} errors={errors}>
			<FormBody>
				<InputGroup name="name" label={t("name_label")} className="p-2 w-full">
					<Input ref={nameInputRef}/>
					<div className="text-xs text-gray-400 mt-1"><b>{t("example")}:</b> {t("name_example")}</div>
				</InputGroup>
				<InputGroup name="organization" label={t("city_label")} className="p-2 w-full">
					<Select options={organizations}
					        unselectedText={t("city_placeholder") + (loadingOrganizations ? " (" + t("loading") + "...)" : "")}/>
				</InputGroup>
				<InputGroup name="description" label={t("description_label")} className="p-2 w-full">
					<TextArea rows="4"/>
				</InputGroup>
				<InputGroup name="objectives" label={t("objectives_label")} className="p-2 w-full">
					<InputList addButtonText={t("add_objectives_button")}/>
				</InputGroup>
				<InputGroup name="benefit" label={t("benefit_label")} className="p-2 w-full">
					<TextArea rows="2" />
				</InputGroup>
				<InputGroup name="metaData" label={t("other_infos_label")} className="p-2 w-full">
					<MetaInputList addButtonText="Adicionar" defaultValue={[
						{name: t("start_date_label"), value: "", error: false},
						{name: t("estimated_end_label"), value: "", error: false},
						{name: t("estimated_duration_label"), value: "357", error: false},
						{name: t("project_state_label"), value: "", error: false},
						{name: t("bidding_label"), value: "100%", error: false},
						{name: t("execution_label"), value: "100%", error: false},
						{name: t("address_label"), value: "", error: false},
					]}/>
				</InputGroup>
				<InputGroup name="categories" label={t("categories_label")} className="p-2 w-full">
					<TagsInput options={tags}/>
				</InputGroup>
				<InputGroup name="images" label={t("images_label")} className="p-2 w-full">
					<ImagesUpload/>
				</InputGroup>
				<InputGroup name="files" label={t("files_label")} className="p-2 w-full">
					<FilesUpload placeholder={t("files_placeholder")}/>
				</InputGroup>
				<div className="border-t border-gray-200 w-full my-4"/>
				<div className="p-2 w-full flex flex-col items-center justify-center">
					<div className="flex flex-col">
						{loading ? <ProgressBar value={progressValue} rounded="rounded rounded-b-none" /> : null}
						<Button color="blue" textSize="xl" className="mx-auto px-8 mb-2" rounded={loading ? "rounded rounded-t-none" : "rounded"} onClick={onClickSubmit}>
							{loading ? <LoadingIcon className="mr-2" size="4"/> : null}
							{t("register_button_label")}
						</Button>
					</div>
					{Object.entries(errors).length > 0 ?
						(<InputError
							error={t("validation_error")}/>)
						: (
							<span className="text-gray-500 text-sm text-center">
								{t("register_help_text")}
							</span>
						)}
				</div>
			</FormBody>
		</Form>
	);
}