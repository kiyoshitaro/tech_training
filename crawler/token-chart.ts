

import puppeteer from 'puppeteer';
import UserAgent from 'user-agents';
import fs from 'fs';
import axios from 'axios';
import { ChatOpenAI } from '@langchain/openai';
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema';
import path from 'path';
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, './.env') });
const openAIKey = process.env.OPENAI_API_KEY;

const filterBestPairs = (pairs: any) => {
  try {
    return (
      pairs &&
      pairs.reduce(
        (max, current) => {
          if (!current?.liquidity?.usd) return max;
          return current?.liquidity?.usd > max?.liquidity?.usd
            ? current
            : max;
        },
        { liquidity: { usd: 0 } },
      )
    );
  } catch (error) {
    return;
  }
}

const getBestPairsTokenByAddress = async (contractAddress: string) => {
  try {
    const userAgent = new UserAgent();
    let url = `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`;
    const result = await axios.get(url, {
      headers: {
        'user-agent': userAgent.toString(),
      },
    });
    if (!result) {
      return null;
    }
    return filterBestPairs(result?.data?.pairs) || null;
  } catch (error) {
    return;
  }
}

(async () => {
  const address = 'GTH3wG3NErjwcf7VGCoXEXkgXSHvYhx5gtATeeM5JAS1';
  const pair = await getBestPairsTokenByAddress(address)
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
  await page.setViewport({ width: 1000, height: 1000 });

  await page.goto(`https://dexscreener.com/solana/${pair?.pairAddress}?embed=1&theme=dark&trades=0&info=0`);
  page.on('console', message => {
    console.log(`Browser console: ${message.text()}`);
  });

  const checkReady = await page.evaluate(async () => {
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
  });
  const setResolution = '1h';
  const createResolution = await page.evaluate(async (setResolution) => {
    console.log("🚀 ~ CrawlService ~ createResolution ~ setResolution:", setResolution)
    await (document as any).querySelector("iframe").contentWindow.tradingViewApi.chart().setResolution(setResolution)
  },setResolution);


  let indicators = [
    {
        "indicatorName": "MACD",
        "settings": [12, 26, "close", 9]
    },
    {
        "indicatorName": "Moving Average Exponential",
        "settings": [12, "close", 0, "SMA", 9]
    },
    {
      "indicatorName": "Moving Average Exponential",
      "settings": [21, "close", 0, "SMA", 9]
    },
    {
        "indicatorName": "Relative Strength Index",
        "settings": [14, "SMA", 14]
    }
  ];

  const createStudy = await page.evaluate(async (indicators) => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const studies = (document as any).querySelector("iframe").contentWindow.tradingViewApi.chart().getAllStudies();
    const studyNames = studies.map(study => study.name);
    indicators.forEach(indicator => {
      const { indicatorName, settings } = indicator;
      if (studyNames.includes(indicatorName)) {
          console.log(`Study name ${indicatorName} exists`);
      } else {
        (document as any).querySelector("iframe").contentWindow.tradingViewApi.activeChart().createStudy(indicatorName, false, false, settings);
        
        console.log(`Study created ${indicatorName}`);
      }
    });
    async function checkLoading() {
      const inLoading = (document as any).querySelector("iframe").contentWindow.tradingViewApi.chart()._chartWidget._inLoadingState;
      if (inLoading) {
          console.log('Chart is still loading, retrying...');
          await sleep(100);
          await checkLoading(); // Recursive call
      } else {
          console.log('Chart loading is done.');
    
      }
  }
  // Start the check
    await checkLoading();
  },indicators);


  const resultBase64 = await page.evaluate(async () => {
    async function saveChartToPNG() {
      const screenshotCanvas = await (document as any).querySelector("iframe").contentWindow.tradingViewApi.takeClientScreenshot();
      return screenshotCanvas.toDataURL();
    }
    // Call the function to save the chart to PNG and return the result
    return await saveChartToPNG();
  });
  const endGetBase64 = Date.now();
    
  // const imageBuffer = Buffer.from(resultBase64.replace(/^data:\w+\/\w+;base64,/, ''));
  // fs.writeFileSync('image.png', imageBuffer, 'base64');
  console.log("🚀 ~ Time endGetBase64:", (endGetBase64 - startBrowser) / 1000)
  await browser.close();

  const chat = new ChatOpenAI({
    modelName: 'gpt-4-vision-preview',
    openAIApiKey: openAIKey,
    temperature: 0,
  });
  const systemMessage = new SystemMessage({
    content: `
    Please analyze the chart based on the following criteria. Keep your responses short and straightforward, and provide additional information to help with the decision-making process for buying the token. THE RETURNED RESPONSE "MUST BE IN JSON FORMAT - NOT MARKDOWN FORMAT".
    recommended_trading_strategy: Provide a brief summary of the suggested trading strategy. Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
    confidence_level: Indicate the confidence level in the recommended strategy,
    recommended_action: Suggest the appropriate action, Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
    target_entry_point:
       - long_position: Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
       - short_position: Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
    target_exit_point:
       - for_long_position: Up to 100 words using response MARKDOWN, highlight adjective/value by markdown in any,
       - for_short_position: Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
    pattern_analysis:
       - price_movement: Describe the recent price movement pattern.  Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
       - lolume: Analyze the volume trend. Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
    key_levels:
       - support: Identify key support levels. Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
       - resistance: Identify key resistance levels. Up to 100 words using response MARKDOWN, highlight adjective/value by markdown,
    ema: Analyze the ema 12 and ema 21 and its signal. You can write some sentences with bullet points. Up to 300 words using response MARKDOWN, highlight adjective/value by markdown, Wrap in a string. If you want to next sentence, you must use "\\n",
    rsi: Analyze the RSI (Relative Strength Index) value and its signal. You can write some sentences with bullet points. Up to 300 words using response MARKDOWN, highlight adjective/value by markdown, Wrap in a string. If you want to next sentence, you must use "\\n",
    macd: Analyze the MACD (Moving Average Convergence Divergence) indicator and its signal. You can write some sentences with bullet points. Up to 300 words using response MARKDOWN, highlight adjective/value by markdown, Wrap in a string. If you want to next sentence, you must use "\\n".
    Example response JSON:
    {
      "recommended_trading_strategy": "Something something paragraph\\nSomething something paragraph",
      "confidence_level": "",
      "recommended_action": "Something something paragraph\\nSomething something paragraph",
      "target_entry_point": {
        "long_position": "Something something paragraph\\nSomething something paragraph",
        "short_position": "Something something paragraph\\nSomething something paragraph",
      },
      "target_exit_point": {
        "for_long_position": "Something something paragraph\\nSomething something paragraph",
        "for_short_position": "Something something paragraph\\nSomething something paragraph",
      },
      "pattern_analysis": {
        "price_movement": "Something something paragraph\\nSomething something paragraph",
        "volume": "Something something paragraph\\nSomething something paragraph",
      },
      "key_levels": {
        "support": "Something something paragraph\\nSomething something paragraph",
        "resistance": "Something something paragraph\\nSomething something paragraph",
      },
      "ema": "Something something paragraph\\nSomething something paragraph",
      "rsi": "Something something paragraph\\nSomething something paragraph",
      "macd": "Something something paragraph\\nSomething something paragraph".
    }
    `,
  });

  const message = new HumanMessage({
    content: [
      {
        type: 'text',
        text: '',
      },
      {
        type: 'image_url',
        image_url: {
          url: resultBase64,
        },
      },
    ],
  });
  const res = await chat.stream([systemMessage, message]);
  let finalContent = ``;
  for await (const chunk of res) {
    finalContent += chunk.content;
  }
  let base64Data  =   resultBase64.replace(/^data:image\/png;base64,/, "");
  base64Data  +=  base64Data.replace('+', ' ');
  const binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
  fs.writeFile("out.png", binaryData, "binary", function (err) {
      console.log(err); // writes out file without error, but it's not a valid image
  });
  console.log("🚀 ~ ANALYZER:", finalContent)
})()