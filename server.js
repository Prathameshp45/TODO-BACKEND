
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userrouter = require("./routes/userRoutes");
const taskrouter = require("./routes/taskRoute");
const categoryrouter = require("./routes/categoryRoute");
const priorityrouter = require("./routes/priorityRoutes");
const imagerouter = require("./routes/imageRoute");


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/To-Do-List");

const database = mongoose.connection;
database.on("error", (error) => {
  console.log("Error", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});


app.use("/api/user", userrouter);
app.use("/api/task", taskrouter);
app.use("/api/category", categoryrouter);
app.use("/api/priority", priorityrouter);
app.use("/api/image", imagerouter);




app.listen(7000, () => {
  console.log("http://localhost:7000");
});
