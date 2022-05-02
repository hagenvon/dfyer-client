import * as web3 from "@solana/web3.js";
import { InfoModel, ParsedToken } from "../models/info.model";
import { getConnection } from "./getConnection";
const allMints = require("../token-holders/token-mint-addresses.json");

export const getOwnedTokens = async (
  from: web3.PublicKey,
  filter: web3.TokenAccountsFilter = {
    programId: new web3.PublicKey(
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
    ),
  }
): Promise<InfoModel[]> => {
  const connection = getConnection();
  const result: ParsedToken[] = [];
  const response = await connection.getParsedTokenAccountsByOwner(from, filter);

  response.value.forEach(({ account }) => {
    const info: ParsedToken = account.data;
    if (info) {
      result.push(info);
    }
  });

  return result.map((it) => it.parsed.info);
};

export const getInfamousTokens = async (
  from: web3.PublicKey,
  filter: web3.TokenAccountsFilter = {
    programId: new web3.PublicKey(
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
    ),
  }
): Promise<InfoModel[]> => {
  const ownedToken = await getOwnedTokens(from, filter);

  return ownedToken.filter(infamousOnly);
};

// const filterZeroAmount = (info: ParsedToken): boolean => {
//   return info.parsed.info.tokenAmount.uiAmount > 0;
// };

const infamousOnly = (info: InfoModel): boolean => {
  const allMintsFromCollection: string[] = allMints;

  return allMintsFromCollection.includes(info.mint);
};

export async function isTokenOwned(from: web3.PublicKey, token: string) {
  const ownedTokens = await getOwnedTokens(from);

  return !!ownedTokens.find((it) => it.mint === token);
}
