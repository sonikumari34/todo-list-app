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
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
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

app.post("/", async (req, res) => {
  const itemName = req.body.ele1;
  const todo4 = new Item({ name: itemName });

  try {
    await todo4.save();
    res.redirect("/");
  } catch (err) {
    console.log("Error saving item:", err);
    res.status(500).send("Error saving item.");
  }
});

app.post("/delete/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await Item.findByIdAndDelete(itemId);
    console.log("Item deleted successfully");
    res.redirect("/");
  } catch (err) {
    console.log("Error deleting item:", err);
    res.status(500).send("Error deleting item.");
  }
});

app.listen(16000, function () {
  console.log("Server is running on port 17000");
});
