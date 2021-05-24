import SearchIcon from "./SearchIcon";
import {useTranslation} from "next-i18next";

export default function Header() {
	const {t, i18n: { language }} = useTranslation("common");
	const onChangeLanguage = (e) => {
		window.location = "/" + e.target.value;
	};

	const supportedLanguages = {
		"pt-BR": "Português (Brasil)",
		"en": "English",
		"es-AR": "Español (Argentina)"
	};

	return (
		<div className="text-gray-600 body-font relative" style={{backgroundColor: "#13326B", backgroundImage: "url(/bg.png)", height: 115}}>
			<div className="container px-5 py-10 mx-auto flex flex-row mx-10">
				<div className="mt-5 mb-5">
					<img src="/fgv-data.png" alt="Dataurbe" className="h-7"/>
				</div>
				<div className="flex flex-row mt-5 mb-5 text-lg ml-auto">
					<a className="text-white mr-2" href="https://dataurbe.appcivico.com/dataset">{t("datasets_menu")}</a>
					<span className="text-white mr-2">|</span>
					<a className="text-white" href="https://dataurbe.appcivico.com/organization">{t("cities_menu")}</a>
					<form method="get" action="https://dataurbe.appcivico.com/dataset" className="relative">
						<input className="bg-white px-2 py-0 text-sm border rounded ml-2" name="q" placeholder={t("search_placeholder")}/>
						<button type="submit" className="absolute right-1 top-2">
							<SearchIcon size="4"/>
						</button>
					</form>
					<select value={language} onChange={onChangeLanguage} className="border border-white rounded-sm px-2 py-0 text-white text-xs uppercase ml-2 mt-1" style={{backgroundColor: "#13326B", height: "22px"}}>
						{Object.entries(supportedLanguages).map(([value, name]) => (
							<option key={value} value={value}>{name}</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}