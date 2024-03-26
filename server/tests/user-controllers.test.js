const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model.js');

const app = require('../server.js');

require("dotenv").config();

// Connect to the database before each test
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

// Close database connection after each test
afterEach(async () => {
    await mongoose.connection.close();
});

describe('GET /api/users/:id', () => {
    it('should return 404 if no user found', async () => {
        const res = await request(app).get('/api/users/123');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message: "No such user!" });
    });

    it('should return 200 and the user object if a user is found', async () => {
        const newUser = await User.create({
            firstName: 'Integration',
            lastName: 'TestOne',
            email: 'itest1@gmail.com',
            password: 'test123'
        });

        const res = await request(app).get(`/api/users/${newUser._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                firstName: 'Integration',
                lastName: 'TestOne',
                email: 'itest1@gmail.com',
            }),
        );
    });
});