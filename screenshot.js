const puppeteer = require('puppeteer-extra');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

(async () => {
  // Use an environment variable for the WebSocket endpoint
  const browserWSEndpoint = process.env.BROWSER_WS_ENDPOINT || 'ws://browserless:3500'; // Default if not specified
  console.log("Connecting to Browserless Chrome at:", browserWSEndpoint);

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: browserWSEndpoint,
    });

    const page = await browser.newPage();
        // Set the desired viewport size
        await page.setViewport({
          width: 1280, // or any other width you want
          height: 720, // or any other height you want
          deviceScaleFactor: 1,
        });
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
  } catch (error) {
    console.error("Failed to connect or take a screenshot:", error);
  }
})();
