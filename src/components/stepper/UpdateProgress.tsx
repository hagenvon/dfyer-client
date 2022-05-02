import { useDispatch, useSelector } from "react-redux";
import { selectAllActiveUpdates } from "../../redux/metadataSelectors";
import React, { useEffect } from "react";
import { getUpdateState } from "../../api/updateTrait";
import {
  ActiveUpdateDetails,
  setActiveTransactionState,
} from "../../redux/uiState";
import { ProgressStepper } from "./Stepper";
import { IUpdateState } from "../../models/IUpdateState";
import { getMetadata } from "../../api/metadata.api";

export function UpdateProgress() {
  const dispatch = useDispatch();
  const activeUpdates: ActiveUpdateDetails[] = useSelector(
    selectAllActiveUpdates
  );
  let interval: NodeJS.Timer;

  useEffect(() => {
    if (activeUpdates.length) {
      interval = setInterval(() => {
        let counter = 0;
        activeUpdates.forEach(async (activeUpdate) => {
          if (
            ![IUpdateState.INVALID, IUpdateState.COMPLETED].includes(
              activeUpdate.state
            )
          ) {
            const state = await getUpdateState(activeUpdate.signature);
            dispatch(
              setActiveTransactionState({
                state,
                signature: activeUpdate.signature,
              })
            );
            if (state === IUpdateState.COMPLETED) {
              // @ts-ignore
              await dispatch(getMetadata(activeUpdate.token));
            }

            counter++;
          }
        });
        // clear if no request was fired
        if (!counter) {
          clearInterval(interval);
        }
      }, 1000);
    } else {
      // clear if list is empty
      clearInterval(interval);
    }

    // clear on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {activeUpdates.map((activeUpdates) => {
        return (
          <ProgressStepper
            signature={activeUpdates.signature}
            key={activeUpdates.signature}
          />
        );
      })}
    </>
  );
}
