import { ChatOpenAI } from '@langchain/openai';
import path from 'path';
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, '../.env') });
import fs from 'fs'
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';

const openAIKey = process.env.OPENAI_API_KEY;

(async () => {
  let laso = fs.readFileSync(path.join(__dirname, '../assets/me.json'), 'utf-8');
  const model = new ChatOpenAI({
    openAIApiKey: openAIKey,
    modelName: 'gpt-4-1106-preview',
  });
  const prompt: any = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `Bạn là thầy có kiến thức về tử vi
Phương pháp luận giải lá số tử vi: 
1. Quan sát tổng quát lá số tử vi

- Sự sinh khắc ngũ hành của Can Chi năm sinh: 
	• Can Chi tương hòa: Bản mệnh có căn bản vững chãi, có đủ khả năng để đạt được cái mình mong muốn.
	• Chi sinh Can: Bản mệnh gặt hái thành công nhờ may mắn, còn thực lực thì có thể chưa đạt được đến mức độ ấy. 
	• Can sinh Chi: Người được trời ưu đãi để làm việc, vừa có khả năng vừa gặp may thuận lợi nên thành công dễ dàng.
	• Can khắc Chi: Người hay gặp nhiều nghịch cảnh, dễ đổ vỡ sự nghiệp.
	• Chi khắc Can: Bản mệnh thành công trong khó khăn, ít gặp may mắn.
- Sự tương quan ngũ hành giữa Mệnh và Cục
	• Cục sinh Mệnh: Bản mệnh được hoàn cảnh ưu đãi, gặp nhiều điều may mắn, thuận lợi. 
	• Mệnh Cục tương hòa: Người này dễ hòa mình với hoàn cảnh, với đời sống bên ngoài.
	• Mệnh sinh Cục: Bản mệnh vất vả, hay phải làm lợi cho thiên hạ.
	• Mệnh khắc Cục: Cuộc đời có nhiều trở ngại, khó thành đại sự.
	• Cục khắc Mệnh: Người sinh không gặp thời, muốn thành công phải trải qua gian khổ.
- Thế đứng của các chính tinh: Sao nào đi với sao nào để thành cặp, vị trí của các cặp sao Âm Dương, Tử Phủ, Thất Sát, sao chủ mệnh. Miếu, hãm của các chính tinh.
- Thế đứng của các cung: Cung Mệnh, Tài Bạch, Quan Lộc… nằm ở đâu?
- Quan sát bố cục của các trung tinh, phụ tinh: Trung tinh gồm các sao như: Khôi Việt, Tả Hữu, Tứ Hoá, Xương Khúc, Thanh Long, Quang Quý, Thiên Hình Thái Tuế, Kiếp sát, Lộc Tồn, Lục sát ( Kình Đà Linh Hoả Không Kiếp), Thiên Mã. 
- Vòng Tràng Sinh, rồi Khốc Hư, Tang Hổ, và các sao chỉ bộ phận trong cơ thể để đoán biết về đặc điểm ngoại hình, bệnh tật.

2. Phân tích các cung :
- phân tích từng cung một với ưu tiên các cung cường trước theo thứ tự
	• Nam mệnh: Mệnh, Thân, Phúc, Quan, Tài, Di, Thê
	• Nữ mệnh: Mệnh, Thân, Phúc, Phu, Tài, Tử 
- Khi xem cho cung Mệnh - Thân và Phúc Đức:
	• Xét và luận đoán các cung liên hệ đến bản thân mình là: Quan Lộc – Tài Bạch – Tật Ách – Thiên Di – Điền Trạch – Nô Bộc.
	• Xét và luận đoán các cung liên hệ đến lục thân như: Phu Thê – Tử Tức – Phụ Mẫu – Huynh Đệ.
- Thông qua cung Mệnh, ta biết được:
	• Cách cục chính của đương số
	• Hình dáng, tính cách, tài năng của đương số
	• Một phần sự thành công trong cuộc đời: về tiền tài địa vị hay hôn nhân, thậm chí cả con cái.
	• Mối tương quan giữa bản thân đương số với thân nhân và với xã hội
- Khi quan sát cung Mệnh người ta xét các yếu tố sau:
	• Vị trí của cung Mệnh trên lá số: Nằm ở cung nào trong số 12 cung từ Tý đến Hợi. Nhị hợp, tam hợp, xung chiếu, giáp các cung nào.
	• Các sao đóng trong Mệnh, chiếu hợp vào Mệnh. Có xem xét cả Miếu, Vượng của sao.
	• Tương tác giữa các sao có ảnh hưởng, giữa sao với cung Mệnh, giữa cung Mệnh với bản mệnh (gồm mệnh nạp âm, can chi tuổi).
	
- Nêu ra các cách cục của các chính tinh, bại tinh, sát tinh (bắt buộc)
        `,
    ),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ]);
  const question = `đây là lá số tử vi của con ${JSON.stringify(laso)}. Thầy giúp con luận giải lá số tử vi này có những cách cục nào`;
  const executionResult = await prompt.pipe(model).stream({
    input: question,
  });
  // const stream = await executionResult.stream(`Bạn có kiến thức về tử vi. đây là lá số tử vi của tôi ${JSON.stringify(laso)}`);
  const chunks: any[] = [];
  for await (const chunk of executionResult) {
    console.log("🚀 ~ forawait ~ chunk:", chunk.content)
    chunks.push(chunk);
  }
  let finalChunk: any = chunks[0];
  for (const chunk of chunks.slice(1, chunks.length - 1)) {
    finalChunk = finalChunk.concat(chunk);
  }
  console.log('=========> ASSISTANT:', finalChunk.content);

})()