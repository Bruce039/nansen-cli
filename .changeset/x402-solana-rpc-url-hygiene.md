---
"nansen-cli": patch
---

x402 Solana blockhash fetches reject a malformed `NANSEN_SOLANA_RPC` URL up front without echoing it (private RPC URLs often embed an API key), time out after 15s so a hanging endpoint no longer stalls payment fallback, and default to the shared RPC registry instead of a hardcoded public endpoint
