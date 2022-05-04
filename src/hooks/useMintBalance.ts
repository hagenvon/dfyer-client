import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getConnection } from "../helper/getConnection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchMintBalance } from "../redux/uiState";
import { butterPubKey } from "../constants/constants";

export function useMintBalance() {
  const mintPublicKey = butterPubKey;
  const { publicKey } = useWallet();
  const connection = getConnection();

  const dispatch = useDispatch();
  const butterBalance = useSelector(
    (state: RootState) => state.ui.butterBalance
  );

  const fetchButterBalance = () => {
    if (publicKey) {
      dispatch(
        // @ts-ignore
        fetchMintBalance({ mint: mintPublicKey, fromPublicKey: publicKey })
      );
    }
  };

  useEffect(() => {
    fetchButterBalance();
  }, []);

  return { butterBalance, fetchButterBalance };
}
