# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npm init -y
npm install --save-dev hardhat
npx hardhat

npx hardhat compile (--force)
npx hardhat clean
npx hardhat test
npx hardhat coverage

npx hardhat node
or Run ganache with hostname of wsl
npx hardhat run --network localGanache scripts/deploy.ts

REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
