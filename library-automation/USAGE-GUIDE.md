# 🎬 Library Automation Demo & Usage Guide

This guide shows you exactly how to use the library book checkout automation.

## 🎯 What This Tool Does

The Library Book Checkout Automation:
1. Opens a web browser
2. Navigates to Sunnyvale Public Library website
3. Logs in with your credentials
4. Searches for each book in your list
5. Checks out available books
6. Places holds on unavailable books
7. Takes a screenshot of the results
8. Provides a detailed summary

## 🚀 Getting Started - Three Ways to Use

### Option 1: Demo Mode (Recommended First)
**No credentials needed - Just see how it works!**

```bash
cd library-automation
node demo.js
```

**What you'll see:**
```
╔════════════════════════════════════════════════════╗
║        DEMO MODE - Library Automation              ║
║  This simulates the checkout process               ║
╚════════════════════════════════════════════════════╝

🚀 Initializing Manus AI and browser...
✅ Browser initialized (Demo Mode)
🌐 Navigating to https://sunnyvale.bibliocommons.com/...
✅ Arrived at library website (Demo Mode)
🔐 Attempting to login...
✅ Successfully logged in (Demo Mode)

📖 Processing 5 book(s)...

📚 Searching for book: "The Great Gatsby"...
✅ Successfully checked out: "The Great Gatsby"

📊 CHECKOUT SUMMARY
✅ Successfully checked out: 4 book(s)
⚠️ Placed on hold: 1 book(s)
```

### Option 2: Quick Test with Environment Variables

1. **Set up your credentials:**
   ```bash
   cd library-automation
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```env
   MANUS_API_KEY=your-manus-api-key
   LIBRARY_USERNAME=your-library-card-number
   LIBRARY_PASSWORD=your-library-pin
   LIBRARY_BOOKS=The Great Gatsby,1984,Atomic Habits
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the automation:**
   ```bash
   npm run example
   ```

### Option 3: Custom Script

Create your own script:

```javascript
import { LibraryCheckout, LibraryCheckoutConfig } from './checkout-books.js';

// Configure your checkout
const config = new LibraryCheckoutConfig(
  'https://sunnyvale.bibliocommons.com/',
  'your-library-card',
  'your-pin',
  [
    'The Great Gatsby',
    'Atomic Habits',
    'Thinking, Fast and Slow'
  ]
);

// Run the automation
const checkout = new LibraryCheckout(config);
await checkout.run();
```

Save as `my-checkout.js` and run with:
```bash
node my-checkout.js
```

## 📖 Example Scenarios

### Scenario 1: Check out specific books for a book club
```javascript
const bookClubList = [
  'The Midnight Library',
  'Project Hail Mary',
  'Circe'
];

const config = new LibraryCheckoutConfig(
  'https://sunnyvale.bibliocommons.com/',
  process.env.LIBRARY_USERNAME,
  process.env.LIBRARY_PASSWORD,
  bookClubList
);
```

### Scenario 2: Check out a series
```javascript
const harryPotterSeries = [
  'Harry Potter and the Sorcerer\'s Stone',
  'Harry Potter and the Chamber of Secrets',
  'Harry Potter and the Prisoner of Azkaban',
  'Harry Potter and the Goblet of Fire'
];

const config = new LibraryCheckoutConfig(
  'https://sunnyvale.bibliocommons.com/',
  process.env.LIBRARY_USERNAME,
  process.env.LIBRARY_PASSWORD,
  harryPotterSeries
);
```

### Scenario 3: Single book checkout
```javascript
const config = new LibraryCheckoutConfig(
  'https://sunnyvale.bibliocommons.com/',
  process.env.LIBRARY_USERNAME,
  process.env.LIBRARY_PASSWORD,
  ['The Pragmatic Programmer']
);
```

## 🔍 Understanding the Output

### Success Messages
- `✅ Browser initialized` - Automation is ready
- `✅ Successfully logged in` - Authentication successful
- `✅ Successfully processed: "Book Title"` - Book checked out or placed on hold

### Error Messages
- `❌ Login failed` - Check your credentials
- `❌ Failed to checkout "Book Title"` - Book may not exist or other issue occurred

### Summary Report
```
📊 CHECKOUT SUMMARY
═══════════════════════════════════════════════
✅ Successfully checked out: 3 book(s)
   • The Great Gatsby
   • 1984
   • Atomic Habits

⚠️ Placed on hold: 1 book(s)
   • To Kill a Mockingbird

📸 Screenshot saved: checkout-result-1703856789123.png
```

## 🛠️ Customization Options

### Change the Library URL
```javascript
const config = new LibraryCheckoutConfig(
  'https://your-library.bibliocommons.com/',  // Change this
  username,
  password,
  books
);
```

### Adjust Browser Visibility
In `checkout-books.js`, change:
```javascript
this.browser = await chromium.launch({
  headless: true,  // false = visible, true = background
  slowMo: 100,     // Adjust speed (milliseconds)
});
```

### Modify Timeouts
```javascript
await this.manusClient.execute({
  page: this.page,
  instruction: loginInstruction,
  timeout: 30000,  // Increase if needed (milliseconds)
});
```

## 🔐 Security Best Practices

### ✅ DO:
- Store credentials in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables in scripts
- Keep your Manus AI API key private
- Rotate your library PIN regularly

### ❌ DON'T:
- Hardcode credentials in scripts
- Commit `.env` files to Git
- Share your API keys
- Use this tool on public computers
- Violate library terms of service

## 📊 What Happens During Automation

```
┌─────────────────────────────────────────┐
│  1. Initialize Browser & Manus AI       │
│     • Launch Chromium                   │
│     • Connect to Manus AI               │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  2. Navigate to Library Website         │
│     • Load Sunnyvale Public Library     │
│     • Wait for page to be ready         │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  3. Login                               │
│     • Manus AI finds login form         │
│     • Enters username & password        │
│     • Submits form                      │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  4. For Each Book:                      │
│     • Search for book                   │
│     • Check availability                │
│     • Click checkout/hold button        │
│     • Wait for confirmation             │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  5. Generate Report                     │
│     • Take screenshot                   │
│     • Show summary                      │
│     • Close browser                     │
└─────────────────────────────────────────┘
```

## 💡 Tips & Tricks

1. **Start with Demo Mode** - Always run `npm run demo` first to understand the flow
2. **Test with One Book** - Try checking out a single book before running a large batch
3. **Check Screenshots** - Review the screenshot files to verify results
4. **Monitor Console** - Watch the console output for any issues
5. **Respect Rate Limits** - Don't run the automation too frequently

## 🆘 Troubleshooting

### Problem: "Login failed"
**Solution:** 
- Verify your library card number and PIN
- Try logging in manually first to ensure credentials work
- Check if the library website has changed

### Problem: "Failed to checkout book"
**Solution:**
- Verify the exact book title in the library catalog
- Check if the book is actually available
- Try searching for the book manually first

### Problem: "Browser doesn't open"
**Solution:**
- Run `npm install` to ensure Playwright is installed
- Check system requirements for Playwright
- Try running with `headless: true` in the code

### Problem: "Manus AI API error"
**Solution:**
- Verify your API key is correct
- Check your API usage limits
- Ensure you have an active Manus AI subscription

## 📞 Getting Help

1. Check the main [README.md](README.md)
2. Review the [.env.example](.env.example) file
3. Look at the example scripts in [example.js](example.js)
4. Run the demo with `npm run demo`

## 🎓 Learning Resources

- [Manus AI Documentation](https://docs.manus.ai/)
- [Playwright Documentation](https://playwright.dev/)
- [Sunnyvale Public Library](https://sunnyvale.bibliocommons.com/)

---

**Happy Reading! 📚**
