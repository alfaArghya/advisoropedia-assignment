const express = require("express");
const argon2 = require("argon2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const { user, post } = require("./db");
const { userSignup, userSignin } = require("./types");

app.use(express.json());
app.use(cors());

const port = 3000; //port number
const jwtPassword = process.env.JWTPassword; // private key

//jwt token generator
const jwtTokenGenerate = (username) => {
  const token = jwt.sign({ username: username }, jwtPassword);
  return token;
};

app.get("/", (req, res) => {
  res.send(`<h3>Server is up<h3/>`);
});

//signup route
app.post("/signup", async (req, res) => {
  const username = req.body.username,
    email = req.body.email,
    password = req.body.password;

  const parsedPayload = userSignup.safeParse({ username, email, password });
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "wrong inputs",
    });
    return;
  }

  //hash the password
  const hashPassword = await argon2.hash(password);

  try {
    //check if username or email exists
    // console.log(findUser(username));
    if ((await user.findOne({ username })) || (await user.findOne({ email }))) {
      res.status(411).json({
        msg: "username or email already exists",
      });
      return;
    }

    //create new user
    await user.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    const token = jwtTokenGenerate(username);
    res.status(200).json({
      msg: "signup successful",
      token,
    });
    return;
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

//sign in route
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
    //check if user exists
    const findUser = await user.findOne({ username });
    if (!findUser) {
      res.status(411).json({
        msg: "user does not exist",
      });
      return;
    }

    //match password with hashPassword
    if (!(await argon2.verify(findUser.password, password))) {
      res.status(411).json({
        msg: "incorrect password",
      });
      return;
    }

    const token = jwtTokenGenerate(username);
    res.status(200).json({
      msg: "sign in successful",
      token,
    });
    return;
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

//posts route
app.get("/post", async (req, res) => {
  const token = req.headers.authorization;
  try {
    //decode jwt token
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    if (!(await user.findOne({ username }))) {
      res.status(411).json({ error: "user does not exists" });
      return;
    }

    //get posts from DB
    const posts = await post
      .find()
      .skip(req.body.skipCount * 5)
      .limit(5);
    res.status(200).json({ posts });
    return;
  } catch (err) {
    res.status(403).json({ msg: "Invalid Token" });
  }
});

app.listen(port, () => {
  console.log(`I am listening on http://localhost:${port}`);
});
