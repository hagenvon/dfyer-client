import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction, getAssociatedTokenAddress,
} from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
import { getConnection } from "./getConnection";
import { BUTTER_MINT } from "../constants/constants";
import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

export const getNewWallet = (): web3.Signer => {
  const wallet = web3.Keypair.generate();

  // Associate the mintRequester with this wallet's publicKey and privateKey
  // This is basically the credentials that the mintRequester (creator) would require whenever they want to mint some more tokens
  // Testing the parameters of the minting wallet

  console.log("Wallet's public key: ", wallet.publicKey.toString());
  console.log(wallet.secretKey.toString());

  return wallet;
};

const connection = getConnection();
const pubkeyButter = new web3.PublicKey(BUTTER_MINT);

// let payer: web3.Signer = getNewWallet();

export async function createTransaction(
    fromPublicKey: web3.PublicKey,
  toPublicKey: web3.PublicKey,
  amountButter: number,
  amountSol: number
): Promise<web3.Transaction> {
  let transaction = new web3.Transaction();

  transaction.add(
    await createButterTransaction(
      pubkeyButter,
        fromPublicKey,
      toPublicKey,
      amountButter
    )
  );

  transaction.add(await createSolTransaction(fromPublicKey, toPublicKey, amountSol));

  return transaction
}

const getTokenAccount = async (
  mint: web3.PublicKey,
  owner: web3.PublicKey
) => {
  const connection = getConnection();
  const accountAddress = await getAssociatedTokenAddress(
    mint,
    owner
  );
  return await splToken.getAccount(connection, accountAddress);
};

const createButterTransaction = async (
  mint: web3.PublicKey,
  fromPublicKey: web3.PublicKey,
  toPublicKey: web3.PublicKey,
  amount: number = 1
): Promise<web3.TransactionInstruction> => {
  const fromTokenAccount = await getTokenAccount(
    mint,
    fromPublicKey
  );
  const toTokenAccount = await getTokenAccount(mint, toPublicKey);

  // Add token transfer instructions to transaction
  return createTransferInstruction(
    fromTokenAccount.address,
    toTokenAccount.address,
    fromPublicKey,
    amount
  );
};

const createSolTransaction = async (
    fromPublicKey: web3.PublicKey,
  toPublicKey: web3.PublicKey,
  amountInSol: number = 0.1
): Promise<web3.TransactionInstruction> => {
  return SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    toPubkey: toPublicKey,
    lamports: amountInSol * LAMPORTS_PER_SOL,
  });
};
