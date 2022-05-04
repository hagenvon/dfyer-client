import { FC, useEffect } from "react";
import { useSolBalance } from "../hooks/useSolBalance";
import { useMintBalance } from "../hooks/useMintBalance";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchMintBalance, fetchSolBalance } from "../redux/uiState";
import { butterPubKey } from "../constants/constants";

export const Balance: FC = () => {
  const { connected, publicKey } = useWallet();

  const dispatch = useDispatch();
  const balance = useSelector((state: RootState) => state.ui.solBalance);
  const butterBalance = useSelector(
    (state: RootState) => state.ui.butterBalance
  );

  useEffect(() => {
    if (publicKey) {
      // @ts-ignore
      dispatch(fetchSolBalance(publicKey));

      dispatch(
        // @ts-ignore
        fetchMintBalance({ mint: butterPubKey, fromPublicKey: publicKey })
      );
    }
  }, [publicKey]);

  if (!connected) {
    return <span>Please connect your wallet.</span>;
  }

  return (
    <span>
      {balance.toFixed(4)} SOL | {butterBalance} BUTTER
    </span>
  );
};
