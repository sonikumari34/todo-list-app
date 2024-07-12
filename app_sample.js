const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static('public')); 


app.use(express.urlencoded({ extended: true }));

let items = [];

app.get("/", (req, res) => {
  res.render("list", { ejes: items });
});

app.post("/", (req, res) => {
  const item = req.body.ele1;
  items.push(item);
  res.redirect("/");
});

app.listen(7000, () => {
  console.log("Server started on port 7000");
});
