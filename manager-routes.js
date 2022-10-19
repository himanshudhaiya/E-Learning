const login = require("./routes/manager/login");
const dashboard = require("./routes/manager/dashboard");
const college = require("./routes/manager/college");
const subscription = require("./routes/manager/subscription");
const course = require("./routes/manager/course");
const subject = require("./routes/manager/subject");
const job = require("./routes/manager/job");

const managerRoutes = (app) => {
    app.use("/manager", login)
    app.use("/manager", dashboard)
    app.use("/manager/college", college);
    app.use("/manager/subscription", subscription)
    app.use("/manager/course", course)
    app.use("/manager/subject", subject)
    app.use("/manager/job", job)
};

module.exports = managerRoutes;