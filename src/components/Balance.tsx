import { FC } from "react";
import { useSolBalance } from "../hooks/useSolBalance";
import { useMintBalance } from "../hooks/useMintBalance";
import { useWallet } from "@solana/wallet-adapter-react";

export const Balance: FC = () => {
  const { connected } = useWallet();
  const { balance } = useSolBalance();
  const { butterBalance } = useMintBalance();

  if (!connected) {
    return <span>Please connect your wallet.</span>;
  }

  return (
    <span>
      {balance.toFixed(4)} SOL | {butterBalance} BUTTER
    </span>
  );
};
