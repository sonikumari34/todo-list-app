const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Schema and Model
const trySchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("task", trySchema);

app.get("/", async (req, res) => {
  try {
    const foundItems = await Item.find({});
    res.render("list", { dayejs: foundItems });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while fetching tasks.");
  }
});

app.post("/", function(req, res) {
  const itemName = req.body.ele1;
  const todo4 = new Item({ name: itemName });
  todo4.save();
  res.redirect("/");
});

app.post("/delete/:itemId", function(req, res) {
  const itemId = req.params.itemId;

  Item.findByIdAndDelete(itemId)
    .then(() => {
      console.log("Item deleted successfully");
      res.redirect("/");
    })
    .catch(err => {
      console.log("Error deleting item:", err);
      res.status(500).send("Error deleting item.");
    });
});

app.listen(17000, function () {
  console.log("Server is running on port 8000");
});
