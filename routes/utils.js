const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const requireUser = (req, res, next) => {
	const prefix = 'Bearer '
	const auth = req.headers.authorization;
	if (!auth) {
		next({
			name: 'noAuthorizationError',
			message: 'i need a token. there is a token machine in the lobby.'
		});
	}
	else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length);

		try{
			const { id } = jwt.verify(token, JWT_SECRET);
			if (id) {
				req.user = id *1;
				next();
			}
		}
		catch(error){
			next(error);
		}
	}
};

module.exports = {
  requireUser
};
