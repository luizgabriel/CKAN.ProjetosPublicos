import withSession from "../../utils/session";

async function authenticate(req, res) {
	const {apiKey, host} = req.query;
	const auth = {
		apiKey,
		host
	};

	console.log({auth});
	req.session.set("auth", auth);
	await req.session.save();

	res.redirect("/");
};

export default withSession(authenticate);