import figlet from "figlet";
import express from "express";
import bodyParser from "body-parser";
import db from "./database";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = db.prepare(
    "SELECT * FROM users WHERE username = ? AND password = ?",
  );

  const user = query.get(username, password);

  if (user) {
    res.json({
      success: true,
      message: "success",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "fail",
    });
  }
});

app.listen(port, () => {
  console.log(`Listen to  http://localhost:${port}`);
});
