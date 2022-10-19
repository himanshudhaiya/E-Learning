const Manager = require("../models/Manager");

const LoggedIn = async (req, res, next) => {};

const NotLoggedIn = async (req, res, next) => {
    req.session.path = req.originalUrl;
    const email = req.session.email;
    const password = req.session.password;
    if (!email || !password) return res.redirect("/manager/login");
    const manager = await Manager.findOne({
        email: email,
    });

    if (!manager) return res.redirect("/manager/login");
    const validPassword = manager.password == password ? true : false;
    if (!validPassword) return res.redirect("/manager/login");
    next();
};

module.exports = {
    LoggedIn,
    NotLoggedIn,
};