require ('dotenv').config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/api_routes");
const path = require("path");
const bill = require("./routes/invoice");
const HOST = '0.0.0.0';
const PORT = process.env.PORT;

const cors = require("cors");
app.use(cors({ origin: "https://your-frontend.netlify.app" }));

const app = express();
app.use(cors());
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/public', express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/invoice', express.static(path.join(__dirname, 'public/invoice')));

app.use("/vrundavan", routes, bill);
app.listen(PORT, HOST ,() => {
    console.log(`App is Running on http://${HOST}:${PORT}`);
})