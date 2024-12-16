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
      message: "登陆成功",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "用户名或密码错误",
    });
  }
});

app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});
