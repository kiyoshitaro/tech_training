import * as z from "zod";
import { BaseTool } from "./base.tool";
import { Connection, PublicKey } from "@solana/web3.js";

const solanaProvider = new Connection("https://api.mainnet-beta.solana.com");
async function getTop20TokenHolders(tokenAddress: string) {
  try {
    const tokenMintAddress = new PublicKey(tokenAddress);

    // Fetching all token accounts by token mint address
    const response = await solanaProvider.getTokenLargestAccounts(
      tokenMintAddress
    );

    const largestAccounts = response?.value || [];
    // Sorting accounts by balance and taking top 20
    const topHolders = largestAccounts
      .sort((a, b) => Number(b?.amount) - Number(a?.amount))
      .slice(0, 20);
    return topHolders;
  } catch (error) {
    console.error("Error fetching token holders:", error);
  }
}

export class GetTopHolderTool extends BaseTool {
  name = "get_top_holder";
  description = `Useful get top holder.`;
  question = "";

  objectParam = {};
  // schema = z.object(this.objectParam);
  schema = z.object({
    contract_address: z.string().describe("The contract address of token"),
  });

  constructor() {
    super();
  }
  async _call(input: any) {
    console.log(input, ",,,,,");
    try {
      // const address = tokenDetails?.address
      const topHolder = await getTop20TokenHolders(input.contract_address);
      const top10Holder = topHolder?.slice(0, 10);
      let strTop10Holder = "";
      for (let i = 0; i < top10Holder.length; i++) {
        strTop10Holder += `Rank: ${i + 1}, Address: ${
          top10Holder[i].address
        }, Amount: ${top10Holder[i].amount}\n`;
      }
      return JSON.stringify({
        results: {
          status: 200,
          message: "Get 10 top holder successful",
          data: {
            strTop10Holder,
          },
        },
      });
    } catch (err) {
      this.errorResponse("");
      return JSON.stringify({
        status: 400,
        message: "Get top holder error: " + err.message,
      });
    }
  }
}
