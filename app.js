const cookieParser = require("cookie-parser");
const express = require("express");
require('dotenv').config();
const dbconnect = require("./config/mongoose-connection");
const ownerRoute = require("./routes/ownerRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/owner', ownerRoute); 
app.use('/users', userRoute); 
app.use('/products', productRoute); 


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});


