/**
 * Library Book Checkout Automation using Manus AI
 * 
 * This script uses Manus AI to automate the process of checking out books
 * from the Sunnyvale Public Library website.
 */

import { ManusClient } from '@manus/sdk';
import { chromium } from 'playwright';

/**
 * Configuration for the library checkout
 */
class LibraryCheckoutConfig {
  constructor(url, username, password, books) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.books = books; // Array of book titles to checkout
  }
}

/**
 * Main class for library book checkout automation
 */
class LibraryCheckout {
  constructor(config) {
    this.config = config;
    this.manusClient = null;
    this.browser = null;
    this.page = null;
  }

  /**
   * Initialize Manus AI client and browser
   */
  async initialize() {
    console.log('🚀 Initializing Manus AI and browser...');
    
    // Initialize Manus AI client
    this.manusClient = new ManusClient({
      apiKey: process.env.MANUS_API_KEY || 'your-manus-api-key',
    });

    // Launch browser
    this.browser = await chromium.launch({
      headless: false, // Set to true for production
      slowMo: 100, // Slow down by 100ms for visibility
    });

    this.page = await this.browser.newPage();
    console.log('✅ Browser initialized');
  }

  /**
   * Navigate to the library website
   */
  async navigateToLibrary() {
    console.log(`🌐 Navigating to ${this.config.url}...`);
    await this.page.goto(this.config.url, { waitUntil: 'networkidle' });
    console.log('✅ Arrived at library website');
  }

  /**
   * Login to the library account using Manus AI
   */
  async login() {
    console.log('🔐 Attempting to login...');
    
    // Use Manus AI to understand the page and perform login
    const loginInstruction = `
      Please log in to the library account with the following credentials:
      - Username: ${this.config.username}
      - Password: ${this.config.password}
      
      Find the login button or link, click it, enter the credentials, and submit the form.
    `;

    try {
      // Use Manus AI to execute the login task
      await this.manusClient.execute({
        page: this.page,
        instruction: loginInstruction,
        timeout: 30000,
      });

      console.log('✅ Successfully logged in');
      
      // Wait for login to complete
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('❌ Login failed:', error.message);
      throw error;
    }
  }

  /**
   * Search and checkout a single book
   */
  async checkoutBook(bookTitle) {
    console.log(`📚 Searching for book: "${bookTitle}"...`);

    const searchInstruction = `
      Search for the book titled "${bookTitle}" using the search functionality on this page.
      After finding the book, check if it's available and click on the checkout or "Place Hold" button.
      If the book is already checked out to this account, skip it.
    `;

    try {
      await this.manusClient.execute({
        page: this.page,
        instruction: searchInstruction,
        timeout: 45000,
      });

      console.log(`✅ Successfully processed: "${bookTitle}"`);
      
      // Wait between operations
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error(`❌ Failed to checkout "${bookTitle}":`, error.message);
      // Continue with next book even if one fails
    }
  }

  /**
   * Process all books in the list
   */
  async checkoutAllBooks() {
    console.log(`\n📖 Processing ${this.config.books.length} book(s)...\n`);

    for (const book of this.config.books) {
      await this.checkoutBook(book);
    }

    console.log('\n✅ All books processed');
  }

  /**
   * Take a screenshot of the final state
   */
  async takeScreenshot() {
    const screenshotPath = `checkout-result-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    return screenshotPath;
  }

  /**
   * Clean up resources
   */
  async cleanup() {
    console.log('🧹 Cleaning up...');
    if (this.browser) {
      await this.browser.close();
    }
    console.log('✅ Cleanup complete');
  }

  /**
   * Main execution flow
   */
  async run() {
    try {
      await this.initialize();
      await this.navigateToLibrary();
      await this.login();
      await this.checkoutAllBooks();
      await this.takeScreenshot();
      
      console.log('\n🎉 Book checkout automation completed successfully!');
    } catch (error) {
      console.error('\n❌ Automation failed:', error.message);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

/**
 * Export for use in other scripts
 */
export { LibraryCheckout, LibraryCheckoutConfig };

/**
 * CLI execution
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  // Example usage when run directly
  const config = new LibraryCheckoutConfig(
    process.env.LIBRARY_URL || 'https://sunnyvale.bibliocommons.com/',
    process.env.LIBRARY_USERNAME || 'your-username',
    process.env.LIBRARY_PASSWORD || 'your-password',
    process.env.LIBRARY_BOOKS ? process.env.LIBRARY_BOOKS.split(',') : ['The Great Gatsby']
  );

  const checkout = new LibraryCheckout(config);
  checkout.run().catch(console.error);
}
