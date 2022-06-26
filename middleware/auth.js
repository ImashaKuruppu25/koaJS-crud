const pkg = require("jsonwebtoken");
const { verify } = pkg;
require("dotenv").config();

//middleware
const auth = async (ctx, next) => {
    
  try {
    //get token from header
    const token = await ctx.get("Authorization");
    // console.log(token);

    if (!token) {
      ctx.status = 400;
      ctx.body = "cannot found token";
    }
    await verify(token, process.env.ACCESSTOKEN, async(err, user) => {
      if (err) {
        ctx.status = 400;
        ctx.body = "invalid authantication";
      }
     
      ctx.request.user = user;
      await next();
    });
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

module.exports = auth;
