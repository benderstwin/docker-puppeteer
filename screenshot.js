const puppeteer = require('puppeteer');

(async () => {
  // Use an environment variable for the WebSocket endpoint
  const browserWSEndpoint = process.env.BROWSER_WS_ENDPOINT || 'ws://browserless:3500'; // Default if not specified
  console.log("Connecting to Browserless Chrome at:", browserWSEndpoint);

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: browserWSEndpoint,
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
  } catch (error) {
    console.error("Failed to connect or take a screenshot:", error);
  }
})();
