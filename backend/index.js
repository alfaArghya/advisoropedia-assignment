const express = require("express");
const argon2 = require("argon2");
const cors = require("cors");
const app = express();

const { user, post } = require("./db");
const { userSignup, userSignin } = require("./types");

app.use(express.json());
app.use(cors());
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
  try {
    if ((await user.findOne({ username })) || (await user.findOne({ email }))) {
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
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
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
  try {
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
      msg: "sign in successful",
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

app.get("/post", async (req, res) => {
  try {
    const posts = await post
      .find()
      .skip(req.body.skipCount * 5)
      .limit(5);
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`I am listening on http://localhost:${port}`);
});
