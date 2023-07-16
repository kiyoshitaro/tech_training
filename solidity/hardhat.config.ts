import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
// import "@matterlabs/hardhat-zksync-verify";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";

task("flat", "Flattens and prints contracts and their dependencies (Resolves licenses)")
  .addOptionalVariadicPositionalParam("files", "The files to flatten", undefined, types.inputFile)
  .setAction(async ({ files }, hre) => {
    let flattened = await hre.run("flatten:get-flattened-sources", { files });

    // Remove every line started with "// SPDX-License-Identifier:"
    flattened = flattened.replace(/SPDX-License-Identifier:/gm, "License-Identifier:");
    flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`;

    // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
    flattened = flattened.replace(/pragma experimental ABIEncoderV2;\n/gm, ((i) => (m: any) => (!i++ ? m : ""))(0));
    console.log(flattened);
  });

const zkSyncTestnet =
  process.env.NODE_ENV == "test"
    ? {
      url: "http://localhost:3050",
      ethNetwork: "http://localhost:8545",
      zksync: true,
    }
    : {
      // url: "https://zksync2-testnet.zksync.dev",
      url: "https://testnet.era.zksync.dev",
      ethNetwork: "goerli",
      zksync: true,
      verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'  // Verification endpoint
    };

const config: HardhatUserConfig = {
  zksolc: {
    version: "1.3.10",
    compilerSource: "binary",
    settings: {},
  },
  // defaultNetwork: "zkSyncTestnet",
  // defaultNetwork: "localGanache",
  defaultNetwork: "goerli",
  networks: {
    localGanache: {
      url: "http://172.25.208.1:8545",
      accounts: ['2689e9d83e795f02cd4a17d768ef9bd6cfcb9c325770c358c9d85b668557de0d']
    },
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY],
    // },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli	`,
      accounts: [PRIVATE_KEY],
    },

    zkSyncTestnet,
  },
  solidity: "0.8.18",
};

export default config;
