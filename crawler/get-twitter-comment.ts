

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../.env') });

const xToken = process.env.TWITTER_TOKEN;

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const _buildHeader = () => {
  return {
    'Authorization': `Bearer ${xToken}`,
  };
}

const sendRequest = async (options: any) => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// from:elonmusk -is:retweet -is:reply lang:en
const fetchTwitterThread = async (tweetId: string, startTime: Date, endTime: Date, cursor?: string): Promise<{ data: any[], cursor: string }> => {
  const options = {
    method: 'GET',
    url: `${'https://api.twitter.com/2/tweets'}/search/recent`,
    params: {
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      query: `conversation_id:${tweetId}`,
      max_results: 20,
      'tweet.fields': 'in_reply_to_user_id,author_id,created_at,conversation_id',
      next_token: cursor,
    },
    headers: _buildHeader(),
  };
  const data = await sendRequest(options);
  const whitelists: any[] = [];
  if (data?.data?.length) {
    data?.data?.forEach((tweet: any) => {
      console.log("🚀 ~ data?.data?.forEach ~ tweet:", tweet)
      // TODO: extract ether address from tweet
      const { text, author_id, created_at } = tweet;
      // const address = text?.match(/0x[a-fA-F0-9]{40}/g)?.[0];
      // if (ethers.utils.isAddress(address)) {
      whitelists.push({
        created_at: created_at,
        rest_id: author_id,
        text,
      })
      // }
    })
  }
  return { data: whitelists, cursor: data?.meta?.next_token };
}

const getComment = async (tweetid: string, cursor?: string) => {
  console.log("FETCH WHITELIST");
  const endTime = new Date();
  endTime.setSeconds(endTime.getSeconds() - 11);
  const startTime = new Date(1712941200000);

  const { data, cursor: _cursor } = await fetchTwitterThread(tweetid, startTime, endTime, cursor);
  for (const dt of data) {
    fs.appendFile('data1.json', JSON.stringify(dt, null, 2) + ',', (err) => {
      if (err) {
        console.log('Error writing file:', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  }

  console.log("🚀 ~ Crawl cursor:", cursor, data.length);
  if (_cursor) {
    await sleep(5000)
    await getComment(tweetid, _cursor);
  }
}

(async () => {
  await getComment('1779154932014473333',)
})()