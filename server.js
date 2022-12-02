const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const userRoutes = require("./server/routes/router");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);


const connectDB = require("./server/database/connection");
global.isAuth=false;

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


const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions_data",
});

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: "A Secret String to Sign the Cookie",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    store: store,
  })
);


// load routers
app.use("/", userRoutes);

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    msg = "existing user";
    res.redirect("/");
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
