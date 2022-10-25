"use strict";

const dotenv = require("dotenv")
const express = require("express");
const cors = require("cors");

const imp_user = require('./app/config/config_db')

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
require('./app/models/index.js');
app.use(require("./app/router/index"));
app.listen(PORT, async () => {
    await imp_user();
    console.log(`The app is in 127.0.0.1:${PORT}`);
})//listen