require("./config/passport");
require("dotenv");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const packageRoute = require("./routes/package-route");
const authRoute = require("./routes/auth-route");
const customerRoute = require("./routes/customer-route");
const adminRoute = require("./routes/admin-route");

const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./models");
// sequelize.sync({ alter: true });
// sequelize.sync({ force: true });

app.use(cors());
app.use(express.json());

app.use("/package", packageRoute);
app.use("/auth", authRoute);
app.use("/customer", customerRoute);
app.use("/admin", adminRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server run on ${port}`));
