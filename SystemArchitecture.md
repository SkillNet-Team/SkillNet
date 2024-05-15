# Skillnet Architecture

## High-Level Component Diagram
![high level component](high-level-component.png)
Our application is built with the MERN stack, which consists of MongoDB, Express, Node, and React. When a user opens the application, they will directly interact with the client-side rendered by React. Any calls to the back-end will reach our server, which is running Node/Express. The server will grab data from the MongoDB database if the specific API call requests to do so.

## Entity Diagram
![entity](entity.png)
Two models are used for our application: User and Message. As the names suggest, the User model is used to store data about each specific user and the Message model is used to store each of the messages. Both models are connected via each user's ID, since those are incorportated in the messages that are sent.