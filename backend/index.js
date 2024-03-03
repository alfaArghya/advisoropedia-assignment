const express = require("express");
const argon2 = require("argon2");
const app = express();

const { user, post } = require("./db");
const { userSignup, userSignin } = require("./types");

app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send(`<h3>Server is up<h3/>`);
});

app.post("/signup", async (req, res) => {
  const username = req.body.username,
    email = req.body.email,
    password = await argon2.hash(req.body.password);

  const parsedPayload = userSignup.safeParse({ username, email, password });

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "wrong inputs",
    });
    return;
  }

  if ((await user.findOne({ username })) && (await user.findOne({ email }))) {
    res.status(411).json({
      msg: "username or email already exists",
    });
    return;
  }

  await user.create({
    username: username,
    email: email,
    password: password,
  });

  res.status(200).json({
    msg: "signup successful",
  });
});

app.post("/signin", async (req, res) => {
  const username = req.body.username,
    password = req.body.password;

  const parsedPayload = userSignin.safeParse({ username, password });

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "wrong inputs",
    });
    return;
  }

  const findUser = await user.findOne({ username });

  if (!findUser) {
    res.status(411).json({
      msg: "user does not exist",
    });
    return;
  }

  if (!(await argon2.verify(findUser.password, password))) {
    res.status(411).json({
      msg: "incorrect password",
    });
    return;
  }

  res.status(200).json({
    msg: "signin successful",
  });
});

app.get("/post", async (req, res) => {
  res.send(`<h3>My posts<h3/>`);
});

app.listen(port, () => {
  console.log(`I am listening on http://localhost:${port}`);
});
