const {withIronSession} = require("next-iron-session");

const withSession = (handler) => withIronSession(handler, {
	cookieName: "bid-ckan-projects",
	password: process.env.SESSION_SECRET,
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
});

export default withSession;