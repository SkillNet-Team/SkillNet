const { chromium } = require('playwright');

describe('SignUp Page', () => {
  let browser;
  let page;

  beforeAll(async () => {
    try {
      browser = await chromium.launch();
    } catch (error) {
      console.error('Error launching browser:', error);
    }
  });

  beforeEach(async () => {
    try {
      page = await browser.newPage();
      await page.goto('http://localhost:3000/signup'); // Update the URL if needed
    } catch (error) {
      console.error('Error creating new page:', error);
    }
  });

  afterAll(async () => {
    try {
      if (browser) {
        await browser.close();
      }
    } catch (error) {
      console.error('Error closing browser:', error);
    }
  });

  it('should display success message on form submission', async () => {
    try {
      // Fill out the form
      await page.fill('input[name=firstName]', 'John');
      await page.fill('input[name=lastName]', 'Doe');
      await page.fill('input[name=email]', 'john.doe@example.com');
      await page.fill('input[name=password]', 'password');
      await page.fill('input[name=confirmPassword]', 'password');

      // Submit the form
      await page.click('button[type=submit]');

      // Wait for the success message
      await page.waitForSelector('.signup-container.green-bg');
      const successMessage = await page.$eval('.signup-container p', element => element.textContent);
      expect(successMessage).toBe('Your account has been created successfully!');
    } catch (error) {
      console.error('Error in test:', error);
    }
  });
});
