const helpers = {};
helpers.isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('errors_msg', 'No eres Admin.');
    res.redirect("/users/login");
};

module.exports = helpers;