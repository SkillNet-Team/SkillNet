const express = require('express');
const app = express();
const users_api = require('./views/user-routes');
const messages_api = require('./views/message-routes');
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api/users", users_api);
app.use("/api/messages", messages_api);

// Define your API route handler
app.get("/api", (req, res) => {
    // Send a custom message when accessing the /api endpoint
    res.send("Hurray! Server is running! 🚀");
});

// Connect to database
// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect('mongodb+srv://nathan0322:Nat&dan12@cluster0.ovpx1ss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Connected to database!");

        if(process.env.PORT) {
            // Listen for requests (after connecting to database)
            app.listen(process.env.PORT, () => {
                console.log(`Listening on port ${process.env.PORT}...`);
            });
        }
    })
    .catch((err) => {
        console.log(err);
    });

// Export app
module.exports = app;