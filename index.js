const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());


// MongoDB connection update here
const mongoDBUri = "mongodb+srv://inventorysystem2024:QAg84fv9TnZJDwnt@cluster0.zntgs6j.mongodb.net/production";
mongoose.connect(mongoDBUri, {
    // Remove the deprecated options
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const customerRouter = require("./routes/customer-route");
const categoryRouter = require("./routes/category-route");
const itemRouter = require("./routes/item-route");
const grnRouter = require("./routes/grn-route");
const UserService = require("./services/user-service")
const UserRouter = require('./routes/user-routes')
const OrderRouter = require("./routes/order-route");
const invoiceRouter = require("./routes/invoice-route");
const receiptRouter = require("./routes/receipt-route");
const jobRouter = require("./routes/job-routes");
const chequeRouter = require("./routes/cheque-route");
const reportRouter = require("./routes/report-route");
const routeRouter = require("./routes/route-route");
const expensesRouter = require("./routes/expenses-route");

// const { startPaymentCheckCronJob } = require('./services/order-service');



app.use("/api/customer", customerRouter);
app.use("/api/category", categoryRouter);
app.use("/api/item", itemRouter);
app.use("/api/grn", grnRouter);
app.use("/api/order", OrderRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/user", UserRouter)
app.use("/api/receipt", receiptRouter);
app.use("/api/job", jobRouter);
app.use("/api/cheque", chequeRouter);
app.use("/api/report", reportRouter);
app.use("/api/route", routeRouter);
app.use("/api/expense", expensesRouter);




// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})