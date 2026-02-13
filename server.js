const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const publicKey = "BCOoyQwrS38OAc6WtHy3nY30NTnpTrVd3etHnz6TAjx9nqi9EEvLY9VrurotjYImerLpK5t58I5o3RbYQgqUZlw";
const privateKey = "xN2UYgqD86kFQED2nAKeyMux2nYXLpT4pagzPEhpMds";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicKey,
  privateKey
);

let users = [];

app.post("/subscribe", (req, res) => {
  users.push(req.body);
  res.sendStatus(200);
});

app.post("/send", async (req, res) => {
  const payload = JSON.stringify(req.body);

  for (let user of users) {
    await webpush.sendNotification(user, payload);
  }

  res.send("sent");
});

app.use(express.static("public"));

app.listen(3000, () => console.log("Server running on 3000"));
