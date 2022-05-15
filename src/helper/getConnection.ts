import { Connection } from "@solana/web3.js";

const defaultRpcHost = "https://api.mainnet-beta.solana.com"; // "https://old-empty-resonance.solana-mainnet.quiknode.pro/4a9c3cfdde0e0e289dd7d907c2cd1a81339c98b0/";

const connection = new Connection(defaultRpcHost, "confirmed");

export function getConnection() {
  return connection;
}

export function getNewConnection(rpcHost = defaultRpcHost) {
  return new Connection(rpcHost, "confirmed");
}
