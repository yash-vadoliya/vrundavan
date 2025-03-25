const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const routes = require("./routes/api_routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.use("/vrundavan", routes);

app.listen('5000' ,() => {
    console.log("App is Running on http://localhost:5000");
})