const Koa = require("koa");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const cors = require("koa-cors");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");

const PORT = process.env.PORT || 5000;
const app = new Koa();

app.use(bodyParser());
app.use(json());
app.use(cors());

//routes
app.use(userRouter.routes()).use(userRouter.allowedMethods());

//check status
const db = mongoose.connection;

const dbUpdate = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

//connect db
mongoose.connect(process.env.DB, dbUpdate);

//check status and display status
db.on("error", (err) => {
  console.log("db not connected" + err);
});

db.on("connected", () => {
  console.log("db connected");
});

db.on("open", () => {
  console.log("connection mode");
});

db.on("disconnected", () => {
  console.log("db disconnected ");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
