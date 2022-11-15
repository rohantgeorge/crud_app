const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const userRoutes = require("./server/routes/router");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan("tiny"));

// mongoDB connection
connectDB();

// pass request to body parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs")); // Required if templates are created in another folder inside views folder

// load assets
// app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
// app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
// app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

app.use(express.static(__dirname + "/assets"));

// load routers
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
