# 📚 Library Book Checkout Automation

Automated library book checkout system using **Manus AI** for the Sunnyvale Public Library. This tool automates the process of logging in and checking out multiple books from your library account.

## ✨ Features

- 🤖 **AI-Powered Automation**: Uses Manus AI to intelligently navigate library websites
- 🔐 **Secure Login**: Handles authentication with your library credentials
- 📖 **Batch Checkout**: Check out multiple books at once
- 🎯 **Error Handling**: Continues processing even if individual books fail
- 📸 **Screenshot Reports**: Captures final state for verification
- 🌐 **Sunnyvale Public Library**: Pre-configured for Sunnyvale Public Library

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Sunnyvale Public Library card and credentials
- Manus AI API key (sign up at [manus.ai](https://manus.ai))

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   MANUS_API_KEY=your-manus-api-key
   LIBRARY_USERNAME=your-library-card-number
   LIBRARY_PASSWORD=your-library-pin
   LIBRARY_BOOKS=Book Title 1,Book Title 2,Book Title 3
   ```

3. **Run the example:**
   ```bash
   npm run example
   ```

## 📖 Usage Examples

### Example 1: Using Environment Variables (Recommended)

```bash
# Set your credentials in .env file first
export LIBRARY_USERNAME="1234567890"
export LIBRARY_PASSWORD="1234"
export LIBRARY_BOOKS="The Great Gatsby,1984,Atomic Habits"
export MANUS_API_KEY="your-api-key"

# Run the automation
npm run example
```

### Example 2: Programmatic Usage

```javascript
import { LibraryCheckout, LibraryCheckoutConfig } from './checkout-books.js';

const config = new LibraryCheckoutConfig(
  'https://sunnyvale.bibliocommons.com/',
  'your-library-card-number',
  'your-library-pin',
  [
    'The Great Gatsby',
    'To Kill a Mockingbird',
    'Atomic Habits'
  ]
);

const checkout = new LibraryCheckout(config);
await checkout.run();
```

### Example 3: Single Book Checkout

```javascript
import { LibraryCheckout, LibraryCheckoutConfig } from './checkout-books.js';

const config = new LibraryCheckoutConfig(
  'https://sunnyvale.bibliocommons.com/',
  'your-username',
  'your-password',
  ['The Pragmatic Programmer']
);

const checkout = new LibraryCheckout(config);
await checkout.run();
```

## 🎮 Running Different Examples

The `example.js` file contains 4 different usage examples:

```bash
# Example 1: Basic hardcoded usage
EXAMPLE=1 node example.js

# Example 2: Using environment variables (recommended)
EXAMPLE=2 node example.js

# Example 3: Custom book list
EXAMPLE=3 node example.js

# Example 4: Single book checkout
EXAMPLE=4 node example.js
```

## 🏗️ Project Structure

```
library-automation/
├── checkout-books.js    # Main automation script
├── example.js           # Usage examples
├── package.json         # Dependencies and scripts
├── .env.example         # Environment variables template
└── README.md           # This file
```

## 🔧 Configuration

### LibraryCheckoutConfig Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | Library website URL (default: Sunnyvale Public Library) |
| `username` | string | Your library card number |
| `password` | string | Your library PIN/password |
| `books` | array | List of book titles to checkout |

## 🤖 How It Works

1. **Initialize**: Sets up Manus AI client and browser automation
2. **Navigate**: Goes to the library website
3. **Login**: Uses Manus AI to find and fill login form with credentials
4. **Search & Checkout**: For each book:
   - Searches for the book by title
   - Checks availability
   - Clicks checkout/place hold button
5. **Screenshot**: Captures final state for verification
6. **Cleanup**: Closes browser and cleans up resources

## 🔐 Security Best Practices

1. **Never commit credentials**: Always use environment variables
2. **Use .gitignore**: Ensure `.env` is in `.gitignore`
3. **Rotate passwords**: Change your library PIN regularly
4. **Secure API keys**: Keep your Manus AI API key private

## ⚠️ Important Notes

- This tool is for **personal use only**
- Ensure you have an active library membership
- Books must be available for checkout
- Some books may require holds instead of immediate checkout
- The automation runs with a visible browser (`headless: false`) for debugging

## 🐛 Troubleshooting

### Login fails
- Verify your credentials are correct
- Check if the library website has changed its login process
- Ensure you have an active library card

### Book not found
- Check the exact spelling of the book title
- Verify the book exists in the library catalog
- Try searching manually first to confirm availability

### Manus AI errors
- Verify your API key is valid
- Check your API usage limits
- Ensure you have a stable internet connection

## 📝 Example Output

```
🚀 Initializing Manus AI and browser...
✅ Browser initialized
🌐 Navigating to https://sunnyvale.bibliocommons.com/...
✅ Arrived at library website
🔐 Attempting to login...
✅ Successfully logged in

📖 Processing 3 book(s)...

📚 Searching for book: "The Great Gatsby"...
✅ Successfully processed: "The Great Gatsby"
📚 Searching for book: "1984"...
✅ Successfully processed: "1984"
📚 Searching for book: "Atomic Habits"...
✅ Successfully processed: "Atomic Habits"

✅ All books processed
📸 Screenshot saved: checkout-result-1703856789123.png
🧹 Cleaning up...
✅ Cleanup complete

🎉 Book checkout automation completed successfully!
```

## 📄 License

MIT

## 👤 Author

Kartik Mehta

## 🤝 Contributing

This is a personal project, but feel free to fork and adapt for your own use!

## 🔗 Links

- [Sunnyvale Public Library](https://sunnyvale.bibliocommons.com/)
- [Manus AI Documentation](https://docs.manus.ai/)
- [Playwright Documentation](https://playwright.dev/)
