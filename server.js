
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3120;

app.use(express.json());

app.post('/screenshot', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
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
