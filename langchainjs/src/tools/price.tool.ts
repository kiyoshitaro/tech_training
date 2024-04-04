import { Tool } from 'langchain/tools';

export default class PriceTool extends Tool {
  keySession: string = '';
  data: any[] = [];
  projectId: string = '';
  name = 'get_price';
  description = `Get the price of the cryptocurrency, including: id, symbol, name, image, current price, market cap, market cap rank, fully diluted valuation, total volume, high 24h, low 24h, price change 24h, price change percentage 24h, market cap change 24h, market cap change percentage 24h, circulating supply, total supply, max supply, ath, ath change percentage, ath date, atl, atl change percentage, atl date, roi, last updated`;

  constructor(data: any = []) {
    super();
    this.data = data;
  }

  async _call(input: any) {
    // data
    return JSON.stringify({
      ETH: '20 $'
    });
  }
}
