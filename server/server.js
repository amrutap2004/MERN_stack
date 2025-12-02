const express = require("express");
const app = express();
const router = require("./router/auth-router.js");
const connectDB = require("./utils/db.js");

app.use(express.json());

require('dotenv').config();

app.use("/auth" , router);

connectDB().then(() => {
    app.listen(3000 , () => {
        console.log("Server is running on port 3000");
    });
});

