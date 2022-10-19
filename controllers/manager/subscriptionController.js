const Subscription = require("../../models/Subscription");

class SubscriptionController {
    static list = async (req, res) => {
        try {
            const subscription = await Subscription.find();
            return res.render("manager/subscription", {
                subscription,
            });
        } catch (error) {
            console.log(error);
            return res.send("Something went wrong please try again later");
        }
    };

    static add = async (req, res) => {
        try {
            if (req.body.month == "") {
                return res.send("Month is required");
            }
            if (req.body.sessions == "") {
                return res.send("Coins is required");
            }
            if (req.body.amount == "") {
                return res.send("Amount is required");
            }
            if (req.body.original_amount == "") {
                return res.send("Amount is required");
            }
            const subscription = Subscription({
                month: Number(req.body.month),
                amount: req.body.amount,
                amount_per_month: req.body.amount_per_month,
                heading: req.body.heading,
            });

            await subscription.save();
            return res.send({
                error: false,
                message: "Subscription added successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Somthing went wrong please try again later");
        }
    };

    static edit = async (req, res) => {
        try {
            if (req.body.month == "") {
                return res.send("Month is required");
            }
            if (req.body.amount == "") {
                return res.send("Amount is required");
            }
            if (req.body.amount_per_month == "") {
                return res.send("Amount Per Month is required");
            }
            if (req.body.heading == "") {
                return res.send("Heading is required");
            }

            const subscription = await Subscription.findOne({
                _id: req.body.editid,
            });

            await Subscription.findOneAndUpdate({
                _id: req.body.editid,
            }, {
                month: req.body.edit_month,
                amount: req.body.edit_amount,
                amount_per_month: req.body.edit_amount_per_month,
                heading: req.body.edit_heading,
            });
            return res.send({
                error: false,
                message: "Subscription updated successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Somthing went wrong please try again later");
        }
    };

    static delete = async (req, res) => {
        try {
            const subscription = await Subscription.findOne({
                _id: req.body.id,
            });

            await Subscription.deleteOne({
                _id: subscription.id,
            });
            return res.send({
                error: false,
                message: "Subscription deleted successfully",
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send("Something went wrong please try again later");
        }
    };
}

module.exports = SubscriptionController;