import { useDispatch, useSelector } from "react-redux";
import { selectAllActiveUpdates } from "../../redux/metadataSelectors";
import React, { useEffect } from "react";
import { getUpdateState } from "../../api/updateTrait";
import {
  ActiveUpdateDetails,
  setActiveTransactionState,
} from "../../redux/uiState";
import { ProgressStepper } from "./Stepper";
import { IUpdateState, nonActiveUpdateStates } from "../../models/IUpdateState";
import { getMetadata } from "../../api/metadata.api";

export function UpdateProgress() {
  const dispatch = useDispatch();
  const activeUpdates: ActiveUpdateDetails[] = useSelector(
    selectAllActiveUpdates
  );
  let intervals: NodeJS.Timer[] = [];

  useEffect(() => {
    intervals.forEach((interval) => clearInterval(interval));

    if (activeUpdates.length) {
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
              await dispatch(getMetadata(activeUpdate.token));
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
