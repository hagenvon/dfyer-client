import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { nonActiveUpdateStates } from "../models/IUpdateState";
import {
  fetchUpdateBySignature,
  selectUpdateEntity,
} from "../redux/updateHistoryState";

export function useFetchUpdateItem(signature: string) {
  const { publicKey } = useWallet();
  const dispatch = useDispatch<AppDispatch>();
  const updateItem = useSelector((state: RootState) =>
    selectUpdateEntity(state.updateHistory, signature)
  );
  let interval: NodeJS.Timer;

  useEffect(() => {
    clearInterval(interval);

    if (publicKey && updateItem) {
      if (!nonActiveUpdateStates.includes(updateItem.state)) {
        interval = setInterval(() => {
          dispatch(fetchUpdateBySignature(signature));
        }, 1000);
      }
    }

    // clear on unmount
    return () => {
      clearInterval(interval);
    };
  }, [updateItem]);
}
