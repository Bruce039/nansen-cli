---
"nansen-cli": patch
---

x402 Solana payments refuse a `feePayer` equal to the paying wallet and verify the message header's signer count matches the two signature slots, instead of building a transaction that fails at broadcast
