import withSession from "../../utils/session";

function translateCkanLangToInternalLang(ckanLang) {
	if (String(ckanLang).startsWith("pt"))
		return "pt-BR";
	else if (String(ckanLang).startsWith("en"))
		return "en";
	else if (String(ckanLang).startsWith("es"))
		return "es";

	return "";
}

async function authenticate(req, res) {
	const {apiKey, host, lang} = req.query;
	const auth = {
		apiKey,
		host
	};

	const internalLang = translateCkanLangToInternalLang(lang);

	console.log({auth});
	req.session.set("auth", auth);
	await req.session.save();

	res.redirect("/" + internalLang);
};

export default withSession(authenticate);