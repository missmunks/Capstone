const requireUser = (req, res, next) => {
    if (!req.user) {
        return next({message: 'You must be logged in to perform this action'});
    }
    console.log(req.user);
    next();
}

const requireAdmin = (req, res, next) => {
	if (req.user.isAdmin !== true) {
		return next({message: 'You must have administrator privileges to perform this action'})
	}
	next();
}
module.exports = {
    requireUser,
    requireAdmin,
}
