const Manager = require("../../models/Manager")
const bcrypt = require("bcrypt");

class AuthController {
    static loginGET = async (req, res) => {
        try {
            return res.render("manager/login");
        } catch (error) {
            console.log(error);
            return res.send("Something went wrong please try again later");
        }
    }

    static loginPOST = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        // return console.log(req.body)
        if (!email || !password)
            return res.send("Something went wrong please try again later");
        const manager = await Manager.findOne({
            email: email,
        });
        if (!manager) return res.status(401).send("Account not found");
        const validPassword = await bcrypt.compare(password, manager.password);
        if (!validPassword) return res.status(401).send("Invalid Password");
        req.session.email = manager.email;
        req.session.password = manager.password;
        req.session.manager = manager;
        if (req.session.path) {
            return res.status(200).send(req.session.path);
        } else {
            return res.status(200).send("success");
        }

    }
    static logout = async (req, res) => {
        try {
            req.session.destroy();
            return res.send("success");
        } catch (error) {
            return res.send("Something went wrong please try again later");
        }
    }

}
module.exports = AuthController;