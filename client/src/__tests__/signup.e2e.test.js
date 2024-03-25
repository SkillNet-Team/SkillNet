const { chromium } = require('playwright');

describe('End-to-End Signup Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    try {
      browser = await chromium.launch();
      page = await browser.newPage();
    } catch (error) {
      console.error('Failed to launch browser:', error);
    }
  });

  afterAll(async () => {
    if (browser) {
      try {
        await browser.close();
      } catch (error) {
        console.error('Failed to close browser:', error);
      }
    }
  });

  it('should successfully sign up a new user', async () => {
    if (!browser || !page) {
      console.error('Browser or page is not initialized.');
      return;
    }

    await page.goto('http://localhost:3000/signup'); // Replace with your actual signup page URL

    // Fill out the signup form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');
    await page.click('button[type="submit"]');

    // Check if the success message is displayed
    await page.waitForSelector('.signup-success-message');
    const successMessage = await page.textContent('.signup-success-message');
    expect(successMessage).toContain('Your account has been created successfully!');
  });
});
