```bash
npm create ton@latest
mkdir build 
npx func-js contracts/counter.fc --boc build/counter.cell
npx ts-node deploy.ts
```
