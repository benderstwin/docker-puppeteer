
const express = require('express');
const puppeteer = require('puppeteer-extra');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const app = express();
const port = 3120;
const path = require('path');


app.use(express.json());



// Serve the HTML file containing the iframe
app.get('/dextoolsjngl', (req, res) => {
  res.sendFile(__dirname + '/dextools-widget-jngl.html');
});

app.get('/tradingview', (req, res) => {
  res.sendFile(path.join(__dirname, 'tradingview-widget.html'));
});


app.post('/screenshot', async (req, res) => {
  const { url, selector } = req.body; // You can pass a selector to wait for as part of the request
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://browserless:3500' });
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for network to be idle

    // If a selector is provided, wait for it to be visible
    if (selector) {
      await page.waitForSelector(selector, { visible: true });
    }
    
    // You can add other wait strategies here as needed

    const screenshot = await page.screenshot();
    await browser.close();

    res.status(200).send({ message: 'Screenshot taken', data: screenshot.toString('base64') });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error taking screenshot');
  }
});



app.listen(port, () => {
  console.log(`Puppeteer service listening at http://localhost:${port}`);
});
