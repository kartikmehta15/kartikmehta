/**
 * Example: Library Book Checkout Automation
 * 
 * This example demonstrates how to use the library checkout automation
 * to check out books from Sunnyvale Public Library.
 */

import { LibraryCheckout, LibraryCheckoutConfig } from './checkout-books.js';

/**
 * Example 1: Basic usage with hardcoded values
 */
async function example1_basic() {
  console.log('\n════════════════════════════════════════════════════');
  console.log('Example 1: Basic Book Checkout');
  console.log('════════════════════════════════════════════════════\n');

  const config = new LibraryCheckoutConfig(
    'https://sunnyvale.bibliocommons.com/',  // Sunnyvale Public Library URL
    'your-username-here',                      // Replace with your library card number
    'your-password-here',                      // Replace with your library PIN/password
    [
      'The Great Gatsby',
      'To Kill a Mockingbird',
      '1984'
    ]
  );

  const checkout = new LibraryCheckout(config);
  await checkout.run();
}

/**
 * Example 2: Using environment variables (recommended for security)
 */
async function example2_withEnvVars() {
  console.log('\n════════════════════════════════════════════════════');
  console.log('Example 2: Checkout with Environment Variables');
  console.log('════════════════════════════════════════════════════\n');

  // Load from environment variables
  const config = new LibraryCheckoutConfig(
    process.env.LIBRARY_URL || 'https://sunnyvale.bibliocommons.com/',
    process.env.LIBRARY_USERNAME,
    process.env.LIBRARY_PASSWORD,
    process.env.LIBRARY_BOOKS ? process.env.LIBRARY_BOOKS.split(',') : []
  );

  // Validate configuration
  if (!config.username || !config.password) {
    console.error('❌ Error: Please set LIBRARY_USERNAME and LIBRARY_PASSWORD environment variables');
    console.log('\nExample usage:');
    console.log('  export LIBRARY_USERNAME="your-card-number"');
    console.log('  export LIBRARY_PASSWORD="your-pin"');
    console.log('  export LIBRARY_BOOKS="Book Title 1,Book Title 2,Book Title 3"');
    console.log('  export MANUS_API_KEY="your-manus-api-key"');
    console.log('  node example.js');
    return;
  }

  const checkout = new LibraryCheckout(config);
  await checkout.run();
}

/**
 * Example 3: Interactive mode with custom books
 */
async function example3_custom() {
  console.log('\n════════════════════════════════════════════════════');
  console.log('Example 3: Custom Book List');
  console.log('════════════════════════════════════════════════════\n');

  // Custom configuration for specific use case
  const myBooks = [
    'Atomic Habits',
    'Thinking, Fast and Slow',
    'The Psychology of Money',
    'Deep Work'
  ];

  const config = new LibraryCheckoutConfig(
    'https://sunnyvale.bibliocommons.com/',
    'your-username-here',  // Replace with actual credentials
    'your-password-here',
    myBooks
  );

  const checkout = new LibraryCheckout(config);
  await checkout.run();
}

/**
 * Example 4: Single book checkout
 */
async function example4_singleBook() {
  console.log('\n════════════════════════════════════════════════════');
  console.log('Example 4: Single Book Checkout');
  console.log('════════════════════════════════════════════════════\n');

  const config = new LibraryCheckoutConfig(
    'https://sunnyvale.bibliocommons.com/',
    'your-username-here',
    'your-password-here',
    ['The Pragmatic Programmer']  // Just one book
  );

  const checkout = new LibraryCheckout(config);
  await checkout.run();
}

/**
 * Main execution
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║  Library Book Checkout Automation Examples         ║');
  console.log('║  Powered by Manus AI                               ║');
  console.log('╚════════════════════════════════════════════════════╝');

  // Choose which example to run
  const exampleNumber = process.env.EXAMPLE || '2';

  console.log(`\n📚 Running Example ${exampleNumber}...\n`);

  try {
    switch (exampleNumber) {
      case '1':
        await example1_basic();
        break;
      case '2':
        await example2_withEnvVars();
        break;
      case '3':
        await example3_custom();
        break;
      case '4':
        await example4_singleBook();
        break;
      default:
        console.log('Available examples:');
        console.log('  EXAMPLE=1 node example.js  # Basic usage');
        console.log('  EXAMPLE=2 node example.js  # With environment variables (recommended)');
        console.log('  EXAMPLE=3 node example.js  # Custom book list');
        console.log('  EXAMPLE=4 node example.js  # Single book checkout');
    }
  } catch (error) {
    console.error('❌ Example failed:', error);
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);
