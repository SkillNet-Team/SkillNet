const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
require("dotenv").config();

// Connect to the database before each test
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

// Close database connection after each test
afterEach(async () => {
    await mongoose.connection.close();
});

// Integration test 1
test("GET /api/users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
});

// Integration test 2
test("GET /api/users/0", async () => {
    const response = await request(app).get("/api/users/0");
    expect(response.statusCode).toBe(404);
});