import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchSolBalance } from "../redux/uiState";

export function useSolBalance() {
  const { publicKey } = useWallet();
  const dispatch = useDispatch();
  const balance = useSelector((state: RootState) => state.ui.solBalance);

  // @ts-ignore
  const fetchBalance = () => dispatch(fetchSolBalance(publicKey));

  useEffect(() => {
    fetchBalance();
  }, [publicKey, fetchBalance]);

  return { balance, fetchBalance };
}
