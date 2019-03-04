const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/todos");
let Todo = require("./model/todo");

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyparser());

mongoose.connect("mongodb://localhost/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("mongodb connecton established successfully");
});

app.use("/todos", router);

app.listen(port, function() {
  console.log(`Server is running on port:${port}`);
});
