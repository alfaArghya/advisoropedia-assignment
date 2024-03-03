const zod = require("zod");

const userSignup = zod.object({
  username: zod.string().max(10, { msg: "Must be 5 or fewer characters long" }),
  email: zod.string().email({ msg: "Invalid email address" }),
  password: zod.string(),
});

module.exports = { userSignup };
