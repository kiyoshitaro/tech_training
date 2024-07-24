```bash
solana-test-validator
solana config set --url http://127.0.0.1:8899
anchor init
anchor build
anchor deploy
```

COPY Uint8Array.from(
        bs58.decode(
          'privatekey',
        ),
      ) to wallet.json
