import { StructuredTool } from '@langchain/core/tools';
import * as z from 'zod';

export default class GetPriceTool extends StructuredTool {
  name = 'get_price';

  _call(data: any): any {
    console.log(data);
    const prices = [
      { tokenAddress: '0x123', symbol: 'ETH', price: 3000 },
      { tokenAddress: '0x12321', symbol: 'BTC', price: 60000 },
      { tokenAddress: 'g9s78r3r32', symbol: 'SOL', price: 180 },
    ];
    return JSON.stringify(prices);
  }

  description = 'Get the price of the token addresses';
  schema = z.object({
    tokenAddresses: z
      .string()
      .describe('Token addresses that you want to query price')
      .array(),
  });
}
