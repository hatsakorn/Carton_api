require("./config/passport");
require("dotenv");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const packageRoute = require("./routes/package-route");
const authRoute = require("./routes/auth-route");
const customerRoute = require("./routes/customer-route");
const adminRoute = require("./routes/admin-route");
const invoiceRoute = require("./routes/invoice-route");
const passportAuthentication = require("./middlewares/passportAuthentication");
const warehouseRoute = require("./routes/warehouse-route");

const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./models");

app.use(cors());
app.use(express.json());

app.use("/package", passportAuthentication, packageRoute);
app.use("/auth", authRoute);
app.use("/customer", passportAuthentication, customerRoute);
app.use("/admin", passportAuthentication, adminRoute);
app.use("/invoice", passportAuthentication, invoiceRoute);
app.use("/warehouse", passportAuthentication, warehouseRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server run on ${port}`));
