const cookieParser = require("cookie-parser");
const express = require("express");
require("dotenv").config();
const expressSession = require("express-session");
const flash = require("connect-flash");
const { connectToDb } = require("./config/mongoose-connection");
const ownerRoute = require("./routes/ownerRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const indexRoute = require("./routes/index");

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);
// Frontend
app.use(flash());
app.set("view engine", "ejs");

app.use("/", indexRoute);
app.use("/owner", ownerRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);

async function main() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log("Connection failed", error);
  }
}

main();
