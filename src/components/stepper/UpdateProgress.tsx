import { useDispatch, useSelector } from "react-redux";
import { selectAllActiveUpdates } from "../../redux/metadataSelectors";
import React, { useEffect } from "react";
import { getUpdateState } from "../../api/updateTrait";
import {
  ActiveUpdateDetails,
  endUpdating,
  fetchMintBalance,
  fetchSolBalance,
  markActiveTransactionAsSuccess,
  setActiveTransactionState,
} from "../../redux/uiState";
import { ProgressStepper } from "./Stepper";
import { IUpdateState, nonActiveUpdateStates } from "../../models/IUpdateState";
import { fetchMetadata } from "../../redux/metadataState";
import { Group, Text, Button, Alert } from "@mantine/core";
import { butterPubKey } from "../../constants/constants";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export function UpdateProgress() {
  const { publicKey } = useWallet();
  const dispatch = useDispatch();
  const activeUpdates: ActiveUpdateDetails[] = useSelector(
    selectAllActiveUpdates
  );
  let intervals: NodeJS.Timer[] = [];

  useEffect(() => {
    intervals.forEach((interval) => clearInterval(interval));

    if (activeUpdates.length && publicKey) {
      activeUpdates
        .filter((activeUpdate) => {
          return !nonActiveUpdateStates.includes(activeUpdate.state);
        })
        .forEach((activeUpdate, index) => {
          intervals[index] = setInterval(async () => {
            const state = await getUpdateState(activeUpdate.signature);
            dispatch(
              setActiveTransactionState({
                state,
                signature: activeUpdate.signature,
              })
            );
            if (state === IUpdateState.COMPLETED) {
              // @ts-ignore
              await dispatch(fetchMetadata(activeUpdate.token));
              await dispatch(
                markActiveTransactionAsSuccess(activeUpdate.signature)
              );

              // @ts-ignore
              dispatch(fetchSolBalance(publicKey));
              dispatch(
                // @ts-ignore
                fetchMintBalance({
                  mint: butterPubKey,
                  fromPublicKey: new PublicKey(publicKey),
                })
              );
            }
          }, 1000);
        });
    }

    // clear on unmount
    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [activeUpdates]);

  return (
    <>
      {activeUpdates.map((activeUpdate) => {
        return (
          <div key={activeUpdate.signature}>
            <ProgressStepper signature={activeUpdate.signature} />

            {activeUpdate.showSuccess && (
              <Alert color={"green"} variant={"light"} p={10}>
                <Text mb={10}>Booom! Thug successfully updated!</Text>
                <Button
                  variant={"outline"}
                  color={"green"}
                  onClick={() => dispatch(endUpdating())}
                  fullWidth={true}
                >
                  OK, Thanks!
                </Button>
              </Alert>
            )}
          </div>
        );
      })}
    </>
  );
}
