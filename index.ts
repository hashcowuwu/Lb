import figlet from "figlet";
import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import db from "./database";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// 登陆接口

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = db.prepare("SELECT * FROM users WHERE username = ?");

  const user = query.get(username);

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({
      success: true,
      message: "Login Successful",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Incorrect Username or Password",
    });
  }
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const insert = db.prepare(
    "INSERT INTO users (username, password) VALUES (?, ?)",
  );
  console.log(password);
  try {
    insert.run(username, hashPassword);
    res.json({
      success: true,
      messgae: "Registration Successful",
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: " Username Already Exists",
    });
  }
});

app.get("/getUserById", (req, res) => {
  const { id } = req.query;
  const query = db.prepare("SELECT username from users where id = ?");
  const user = query.get(id);
  if (user) {
    res.json({
      success: true,
      messgae: "query Successful",
      userName: user.username,
    });
  } else {
    res.json({
      success: false,
      message: "not found user",
    });
  }
});

app.listen(port, () => {
  console.log(`Listen to  http://localhost:${port}`);
});
