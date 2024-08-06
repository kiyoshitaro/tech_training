import fs from "fs";
import OpenAI from "openai";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env") });
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "twitter283.p.rapidapi.com",
    },
  };
  const getRest = await fetch(
    "https://twitter283.p.rapidapi.com/UsernameToUserId?username=kiyooshi_Taro",
    options
  );
  const rest_id = (await getRest.json())?.id_str;

  const url = `https://twitter283.p.rapidapi.com/UserTweets?user_id=${rest_id}`;
  const response = await fetch(url, options);
  const result = await response.json();
  let userInfo: any = {};
  let pinTweet = {};
  let tweets = [];
  for (const _t of result?.data?.user_result_by_rest_id?.result
    ?.profile_timeline_v2?.timeline?.instructions) {
    if (_t?.__typename === "TimelinePinEntry") {
      const _pintweet =
        _t?.entry?.content?.content?.tweet_results?.result?.legacy;
      const _userinfo =
        _t?.entry?.content?.content?.tweet_results?.result?.core?.user_results
          ?.result;
      userInfo = {
        username: _userinfo?.core?.name,
        created_at: _userinfo?.core?.created_at,
        // screen_name: _userinfo?.core?.screen_name,
        location: _userinfo?.location?.location,
        bio: _userinfo?.profile_bio?.description,
        followers: _userinfo?.relationship_counts?.followers,
        following: _userinfo?.relationship_counts?.following,
        num_of_tweets: Number(_userinfo?.tweet_counts?.tweets),
        // rest_id: _userinfo?.rest_id,
        is_blue_verified: _userinfo?.verification?.is_blue_verified,
        verified_type: _userinfo?.verification?.verified_type,
      };
      pinTweet = {
        content: _pintweet?.full_text,
        rest_id: _t?.entry?.content?.content?.tweet_results?.result?.rest_id,
        reply_count: _pintweet?.reply_count,
        retweet_count: _pintweet?.retweet_count,
        favorite_count: _pintweet?.favorite_count,
        created_at: _pintweet?.created_at,
      };
    }
    if (_t?.__typename === "TimelineAddEntries") {
      console.log(
        _t?.entries.slice(0, _t?.entries.length - 2).length,
        "ss",
        _t?.entries.length
      );
      let cntGetReply = 0;
      for (const _tw of _t?.entries.slice(0, _t?.entries.length - 2)) {
        const _tweet =
          _tw?.content?.content?.tweet_results?.result?.__typename === "Tweet"
            ? _tw?.content?.content?.tweet_results?.result
            : _tw?.content?.content?.tweet_results?.result?.tweet;
        const _twLegacy = _tweet?.legacy;
        const content = _twLegacy?.full_text
          .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
          .replace(/@/g, "");
        if (
          _tweet?.rest_id &&
          (!_twLegacy?.retweeted_status_results ||
            (Object.keys(_twLegacy?.retweeted_status_results).length === 0 &&
              content.split(" ").length > 10)) &&
          cntGetReply < 6
        ) {
          cntGetReply += 1;
          console.log("Loading ===== ", _tweet?.rest_id);
          let replies = [];
          const _response = await fetch(
            `https://twitter283.p.rapidapi.com/TweetDetailConversation?tweet_id=${_tweet?.rest_id}`,
            options
          );
          const _result = await _response.json();
          for (const _rp of _result?.data
            ?.threaded_conversation_with_injections_v2?.instructions[0]
            ?.entries) {
            const _rrp =
              _rp?.content?.__typename === "TimelineTimelineItem"
                ? _rp?.content?.content?.tweet_results?.result
                : _rp?.content?.items?.[0]?.item?.content?.tweet_results
                    ?.result;
            const contentRep = _rrp?.legacy?.full_text
              .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")
              .replace(/@/g, "");
            if (contentRep?.split(" ").length > 10) {
              replies.push({
                content: contentRep,
                username: _rrp?.core?.user_results?.result?.core?.name,
              });
            }
          }
          tweets.push({
            // rest_id: _tweet?.rest_id,
            content: content,
            reply_count: _twLegacy?.reply_count,
            retweet_count: _twLegacy?.retweet_count,
            favorite_count: _twLegacy?.favorite_count,
            created_at: _twLegacy?.created_at,
            comments: replies,
          });
        }
      }
    }
  }
  // const datas: any = { ...userInfo, pin_tweet: pinTweet, last_tweets: tweets };
  const prompt = `Hãy đưa ra một lời châm chọc ngắn gọn và tàn nhẫn bằng tiếng lóng cho hồ sơ Twitter sau: ${
    userInfo?.username
  }. Đây là thông tin chi tiết: "${JSON.stringify(
    userInfo
  )}", với các bài viết gần nhất cùng các bình luận "${JSON.stringify(
    tweets
  )}"`;
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: false,
    messages: [
      {
        role: "system",
        content:
          // "You roast people twitter account based on their bio, username, verify, and last posts with comments as harsh and spicy as possible, and keep it short.",
          "Bạn hãy châm chọc tài khoản twitter của mọi người dựa trên thông tin bio, username, verify, phân tích kỹ các bài đăng cuối cùng kèm bình luận xem cộng đồng đánh giá thế nào và đưa vào câu châm biếm một cách gay gắt và cay nhất có thể, với 100 - 150 từ",
      },
      { role: "user", content: prompt },
    ],
  });

  const roast = completion.choices[0].message.content;
  console.log(roast);
  fs.writeFileSync(
    "./res2.json",
    JSON.stringify({ userInfo, pinTweet, tweets }, null, 2)
  );
})();

// (async () => {
//   const response = await fetch("http://localhost:5173/llama", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username: "kiyooshi_Taro",
//       language: "vietnamese",
//     }),
//   });
//   const result = await response.json();
//   console.log(result);
// })();
