import * as z from "zod";
import { BaseTool } from "./base.tool";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { ethers } from "ethers";
export const WRAPPED_SOLANA_ADDRESS =
  "So11111111111111111111111111111111111111112";
const solanaProvider = new Connection("https://api.mainnet-beta.solana.com");

async function getTokenHoldings(address: string) {
  try {
    const [token, token2022] = await Promise.all([
      solanaProvider.getParsedTokenAccountsByOwner(
        new PublicKey(address),
        {
          programId: TOKEN_PROGRAM_ID,
        },
        "confirmed"
      ),
      solanaProvider.getParsedTokenAccountsByOwner(
        new PublicKey(address),
        {
          programId: new PublicKey(
            "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
          ),
        },
        "confirmed"
      ),
    ]);
    return token.value
      .concat(token2022.value)
      .filter((item) => item.account.data.parsed.info.tokenAmount.uiAmount > 0)
      .map((item) => ({ ...item.account.data.parsed.info }));
  } catch (e) {
    console.log("[getTokenHoldings] [error]: ", e);
    return [];
  }
}
async function getNativeAmount(walletAddress: string) {
  const nativeAmount = ethers.utils.formatUnits(
    await solanaProvider.getBalance(new PublicKey(walletAddress)),
    9
  );
  return nativeAmount;
}

async function getTokenBalance(walletAddress: string, isNative = false) {
  const listTokensInWallet = await getTokenHoldings(walletAddress);
  const nativeAmount = await getNativeAmount(walletAddress);
  const result = listTokensInWallet.map((token) => {
    return {
      tokenAddress: token.mint,
      balance: Number(token.tokenAmount.uiAmount) || 0,
      symbol: token?.symbol || "",
      decimals: Number(token?.tokenAmount?.decimals) || 9,
    };
  });

  if (Number(nativeAmount) > 0 && isNative) {
    result.push({
      tokenAddress: WRAPPED_SOLANA_ADDRESS,
      balance: Number(nativeAmount),
      symbol: "SOL",
      decimals: 9,
    });
  }

  return result;
}

async function getBalanceByAddress(walletAddress: string) {
  try {
    const balances = await getTokenBalance(walletAddress);
    const result = balances.map((item: any) => ({
      ...item,
      icon: "icon",
      price: 1000,
    }));
    return {
      walletAddressOfUser: walletAddress,
      balances: result,
    };
  } catch (error) {
    throw error;
  }
}

export default class GetBalanceTool extends BaseTool {
  name = "get_balance";
  constructor() {
    super();
  }
  description = "Get the balance of the wallet address";
  schema = z.object({
    // wallet_address: z.string().describe("The wallet address of user"),
  });

  async _call() {
    try {
      this.loadingResponse(`I'm checking your wallet...`);
      const result = await getBalanceByAddress(this._data?.walletAddress);
      const balances = (result?.balances || []).map((balance) => {
        return {
          symbol: balance?.symbol || "",
          balance: balance?.balance || 0,
          tokenAddress: balance?.tokenAddress || "",
        };
      });
      return JSON.stringify({
        data: {
          ...result,
          balances,
        },
      });
    } catch (e) {
      console.log(e);
      this.errorResponse("");
      return JSON.stringify({
        status: 400,
        messages: "Please check again and run again the get check wallet tool",
      });
    }
  }
}
