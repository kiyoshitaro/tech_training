import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import path from 'path';

(async () => {
  const loader = new PDFLoader(path.join(__dirname, '../assets/GCEE_ISVC.pdf'), {
    splitPages: false,
  });
  const docs = await loader.load();

  const state_of_the_union = "Madam Speaker, Madam Vice President, our First Lady and Second Gentleman. Members of Congress and..."
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 400,
  });

  // const splitDocs = await textSplitter.splitText(state_of_the_union);
  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log("🚀 ~ splitDocs:", splitDocs, splitDocs.length)
})()
