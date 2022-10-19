const home = require("./routes/app/home");
const apiRoutes = require("./routes/app/apiRoutes");
const auth = require("./routes/app/auth");
const payment = require("./routes/app/payment");

const AppRoutes = (app) => {
  app.use("/app", home);
  app.use("/app/user", auth);
  app.use("/app", apiRoutes);
  app.use("/app", payment);
};

module.exports = AppRoutes;
