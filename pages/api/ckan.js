import withSession from "../../utils/session";
import {acceptMethods} from "../../utils/middlewares";

function getCkanCredentials(req, res) {
	res.status(200).json(req.session.get("auth"));
}

export default withSession(acceptMethods(["GET"], getCkanCredentials));