import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { compile } from "html-to-text";
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url";


import fs from 'fs';

(async () => {
  const loader = new CheerioWebBaseLoader(
    "http://tuvi.cohoc.net/la-so-tu-vi-nam-at-suu-thang-12-ngay-21-gio-suu-am-nam-lid-1.html",
    {
      // selector: 'h4.nguyennhan'
      // selector: 'body.div.div.div.div.div.h4'
    }
  );

  const docs = await loader.load();
  const test = await loader.scrape();
  console.log("🚀 ~ test(('h4.nguyennhan')):", test('body>div>div>div>div>div>h4').html())
  // console.log("🚀 ~ test:", test.html())

  // console.log("🚀 ~ docs:", docs[0].pageContent);

  // const compiledConvert = compile({ wordwrap: 130 }); // returns (text: string) => string;
  // const loader = new RecursiveUrlLoader("http://tuvi.cohoc.net/la-so-tu-vi-nam-at-suu-thang-12-ngay-21-gio-suu-am-nam-lid-1.html", {
  //   extractor: compiledConvert,
  //   maxDepth: 1,
  //   excludeDirs: ["https://js.langchain.com/docs/api/"],
  // });

  // const docs = await loader.load();
  // console.log("🚀 ~ docs:", docs)


  //   fs.writeFile('CheerioWebBaseLoader.json', JSON.stringify(docs[0].pageContent, null, 2), (err) => {
  //   if (err) {
  //     console.log('Error writing file:', err);
  //   } else {
  //     console.log('Successfully wrote file');
  //   }
  // });

})()
