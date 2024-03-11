const express = require('express');
const app = express();

// Define your API route handler
app.get("/api", (req, res) => {
    // Send a custom message when accessing the /api endpoint
    res.send("Hurray! Server is running! 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
