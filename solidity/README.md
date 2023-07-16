# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npm init -y
npm install --save-dev hardhat
npx hardhat

# choose defaultNetwork in hardhat.config.ts
npx hardhat compile (--force)

# If the contract was already compiled in ZKSYNC, it won't recompile until you delete the artifacts-zk and cache-zk folders, or change the compiler version.

npx hardhat clean
npx hardhat test (--network)
npx hardhat coverage

npx hardhat node
or Run ganache with hostname of wsl

npx hardhat run --network localGanache scripts/deploy.ts
or
npx hardhat deploy-zksync --script deploy.ts

REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts

# flatten to verify and publish
npx hardhat flatten contracts/Tardis.sol > contracts-flatten/Tardis.sol
# flat define as task in hardhat.config.ts
npx hardhat flat contracts-flatten/Tardis.sol > contracts-flatten/Tardis-output.sol
```

Run local net: 
```shell
git clone https://github.com/matter-labs/local-setup.git
cd local-setup
./start.sh
./clear.sh

```
Contain three docker containers:
  - Postgres (used as the database for zkSync).
  - Local Geth node (used as L1 for zkSync).
  - zkSync node itself.

Local L1 network

Network Name: L1 local
RPC URL: http://localhost:8545/
Chain ID: 9
Currency Symbol: ETH
Local zkSync network

Network Name: L2 local zkSync
RPC URL: http://localhost:3050/
Chain ID: 270
Currency Symbol: ETH
