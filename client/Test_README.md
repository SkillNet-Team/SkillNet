# How to run the project:

- Clone the repository
- Make sure to have the .env file under server folder which have these 2 lines:
  MONGODB_URI = mongodb+srv://admin:skillnetadmin123@skillnet.6yk66q8.mongodb.net/skillnet-db?retryWrites=true&w=majority&appName=SkillNet
  PORT=5000

- In the terminal go to client directory -> npm install -> npm start
- Open another terminal go to server directory -> npm install -> npm run dev

You should see the message conncted to database in server and the app will start

# Tests Performed:

- Unit Test : Under Navbar as Navbar.test.js
- Integration Test: Under Pages -> SignUp -> SignUp.test.js
- End to End Test: clinet -> cypress -> e2e ->spec.cy.js

# How to run the tests:

## Unit Test & Integration Test:

- Used jest

- Open Terminal -> go to client -> npm test

- You will see all test cases are passed

## End to End Test:

- Used Cypress tool as PlayWright tool was giving me some issues

- Open Terminal -> go to client -> npm install cypress -> npx cypress open

- Then select E2E Testing -> it will ask you to choose a browser (Chrome) -> Hit E2E testing in chrome -> open spec.cy.js -> It will aoutotest by generating random email addresses and autofill

- You will see "Your account has been created successfully!" message meaning our End to End test passed
