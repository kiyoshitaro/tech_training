

import puppeteer from 'puppeteer';
import UserAgent from 'user-agents';
import fs from 'fs';

(async () => {
  const address = '0x026d09a6995f2d3250d9728e2bd58c6c2b953955';
  const startBrowser = Date.now();
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox',
      // '--start-maximized', // Maximize the browser window on startup
      // '--disable-automation', // Exclude the "enable-automation" switch
      // '--disable-blink-features=AutomationControlled' // Disable the use of the Chrome automation extension
    ] // Include the --no-sandbox flag
  }); // Launch browser with headless mode off
  const userAgent = new UserAgent();
  const page = await browser.newPage();
  page.setUserAgent(userAgent.toString());
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(`https://dexscreener.com/base/${address}?embed=1&theme=dark&trades=0&info=0`);
  page.on('console', message => {
    console.log(`Browser console: ${message.text()}`);
  });
  const resultBase64 = await page.evaluate(async () => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function checkReady(onReady) {
      try {
        (document as any).querySelector("iframe").contentWindow.widgetReady(() => {
          onReady("okie");
        });
      } catch (e) {
        await sleep(100);
        await checkReady(onReady);
      }
    }

    async function waitReady() {
      return new Promise(resolve => {
        checkReady(resolve);
      });
    }

    await waitReady();
    (document as any).querySelector("iframe").contentWindow.tradingViewApi.chart().setResolution("4h");
    // Execute the desired actions after the page is ready
    (document as any).querySelector("iframe").contentWindow.tradingViewApi.activeChart().createStudy("Relative Strength Index");
    (document as any).querySelector("iframe").contentWindow.tradingViewApi.activeChart().createStudy('MACD', false, false, { in_0: 14, in_1: 30, in_3: 'close', in_2: 9 });
    // Wait for 500 milliseconds
    await sleep(1500);

    async function saveChartToPNG() {
      const screenshotCanvas = await (document as any).querySelector("iframe").contentWindow.tradingViewApi.takeClientScreenshot();
      return screenshotCanvas.toDataURL();
    }
    return await saveChartToPNG();
  });
  const endGetBase64 = Date.now();

  const imageBuffer = Buffer.from(resultBase64.replace(/^data:image\/\w+;base64,/, ''));
  fs.writeFileSync('image.png', imageBuffer, 'base64');
  console.log("🚀 ~ Time endGetBase64:", (endGetBase64 - startBrowser) / 1000)
  await browser.close();
})()