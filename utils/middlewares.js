export const acceptMethods = (allowedMethods, handler) => async (req, res) => {
	if (allowedMethods.indexOf(req.method) !== -1) {
		await handler(req, res);
	} else {
		console.log("Method not allowed!", {
			method: req.method,
			allowedMethods
		});
		res.status(405).end();
	}
}