const koaRouter = require("koa-router");
const {
  register,
  login,
  getUserDetails,
  getAllDetails,
  updateUser
} = require("../api/userApi");
const auth = require("../middleware/auth");

const userRouter = new koaRouter({ prefix: "/user" });

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getDetails", auth, getUserDetails);
userRouter.put('/updateUser',auth,updateUser)
userRouter.get("/getall", getAllDetails);

module.exports = userRouter;
