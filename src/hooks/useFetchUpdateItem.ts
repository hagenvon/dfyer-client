import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { nonActiveUpdateStates } from "../models/IUpdateState";
import {
  fetchUpdateBySignature,
  selectUpdateEntity,
} from "../redux/updateHistoryState";
import { IUpdateEntity } from "../models/IUpdateEntity";

export function useFetchUpdateItem(updateItem?: IUpdateEntity) {
  const { publicKey } = useWallet();
  const dispatch = useDispatch<AppDispatch>();
  let interval: NodeJS.Timer;

  useEffect(() => {
    clearInterval(interval);

    if (publicKey && updateItem) {
      if (!nonActiveUpdateStates.includes(updateItem.state)) {
        interval = setInterval(() => {
          dispatch(fetchUpdateBySignature(updateItem.signature));
        }, 1000);
      }
    }

    // clear on unmount
    return () => {
      clearInterval(interval);
    };
  }, [updateItem]);
}
