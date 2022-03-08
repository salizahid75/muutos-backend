"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");

const userRouters = require("./routes/user-routes");
const vendorRouters = require("./routes/vendor-routes");
const serviceCategoryRouters = require("./routes/categoryService-route");
const productCategoryRouters = require("./routes/categoryProducts-route");
const emailRouters = require("./routes/email-routes");
const bannerRouter = require("./routes/banner-route");
const productRouters = require("./routes/product-router");
const serviceRouter = require("./routes/service-router");
const staffRouter = require("./routes/staff-router");
const orderRouter = require("./routes/order-router");
const discountRouter = require("./routes/discount-router");
const announcementRouter = require("./routes/announcement-router");
const commentRouter = require("./routes/comment-router");
const articleRouter = require("./routes/article-router");
const paymentRouter = require("./routes/payment-router");
const adminRouter = require("./routes/admin-router");
const reviewRouter = require("./routes/review-router");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", paymentRouter.routes);
app.use("/api", commentRouter.routes);
app.use("/api", articleRouter.routes);
app.use("/api", announcementRouter.routes);
app.use("/api", discountRouter.routes);
app.use("/api", staffRouter.routes);
app.use("/api", orderRouter.routes);
app.use("/api", serviceRouter.routes);
app.use("/api", userRouters.routes);
app.use("/api", vendorRouters.routes);
app.use("/api", serviceCategoryRouters.routes);
app.use("/api", productCategoryRouters.routes);
app.use("/api", emailRouters.routes);
app.use("/api", bannerRouter.routes);
app.use("/api", productRouters.routes);
app.use("/api", adminRouter.routes);
app.use("/api", reviewRouter.routes);
app.use("/upload", express.static("upload"));

app.listen(config.port, () =>
    console.log("app is listening on url cloud: " + config.port)
);
