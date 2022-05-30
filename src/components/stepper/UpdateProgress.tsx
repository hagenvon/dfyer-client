import { useDispatch, useSelector } from "react-redux";
import { selectAllActiveUpdates } from "../../redux/metadataSelectors";
import React, { useEffect } from "react";
import { getUpdateState } from "../../api/updateTrait";
import {
  ActiveUpdateDetails,
  fetchMintBalance,
  fetchSolBalance,
  markActiveTransactionAsSuccess,
  setActiveTransactionState,
} from "../../redux/uiState";
import { ProgressStepper } from "./Stepper";
import { IUpdateState, nonActiveUpdateStates } from "../../models/IUpdateState";
import { fetchMetadata } from "../../redux/metadataState";
import { Text, Button, Alert } from "@mantine/core";
import { butterPubKey } from "../../constants/constants";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { AppDispatch, RootState } from "../../redux/store";
import {
  hideUpdateModal,
  selectUpdateEntity,
} from "../../redux/updateHistoryState";
import { useFetchUpdateItem } from "../../hooks/useFetchUpdateItem";

export function UpdateProgress({ signature }: { signature: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const activeUpdate = useSelector((state: RootState) =>
    selectUpdateEntity(state.updateHistory, signature)
  );

  useFetchUpdateItem(activeUpdate);

  if (!activeUpdate) {
    return null;
  }

  return (
    <div key={activeUpdate.signature}>
      <ProgressStepper signature={activeUpdate.signature} />

      {activeUpdate.state === IUpdateState.COMPLETED && (
        <Alert color={"green"} variant={"light"} p={10}>
          <Text mb={10} size={"sm"}>
            Booom! Thug successfully updated!
          </Text>
          <Button
            variant={"outline"}
            color={"green"}
            onClick={() => dispatch(hideUpdateModal())}
            fullWidth={true}
          >
            Awesome!
          </Button>
        </Alert>
      )}
    </div>
  );
}
