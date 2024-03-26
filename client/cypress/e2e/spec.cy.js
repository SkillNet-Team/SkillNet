// cypress/integration/signup.spec.js
function generateRandomEmail() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let email = '';
  // Generate a random string for the email prefix
  for (let i = 0; i < 10; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  // Add the domain name
  email += '@example.com';
  return email;
}
// Example usage:
const randomEmail = generateRandomEmail();
console.log(randomEmail);
describe('Signup', () => {
  it('should allow user to sign up with valid credentials', () => {
    cy.visit('http://localhost:3000/signup'); // Assuming your signup page is accessible at the root URL
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert that the success message is displayed
    cy.contains('Your account has been created successfully!').should('be.visible');
  });
});
