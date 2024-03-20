const express = require('express');
const app = express();
const users_api = require('./views/user-routes');
app.use("/api/users", users_api);
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');

app.use(cors());

// Define your API route handler
app.get("/api", (req, res) => {
    // Send a custom message when accessing the /api endpoint
    res.send("Hurray! Server is running! 🚀");
});

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database!");

        if(process.env.PORT) {
            // Listen for requests (after connecting to database)
            app.listen(process.env.PORT, () => {
                console.log(`Listening on port ${process.env.PORT}...`);
            });
        }

        // Export app
        module.exports = app;
    })
    .catch((err) => {
        console.log(err);
    });