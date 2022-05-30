import { Alert, Button, Stepper, Text } from "@mantine/core";
import { IUpdateState } from "../../models/IUpdateState";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { X } from "tabler-icons-react";
import { retryUpdate } from "../../api/updateTrait";
import {
  selectUpdateEntity,
  updateUpdateEntity,
} from "../../redux/updateHistoryState";
import { getUpdateSteps } from "./getUpdateSteps";

export function ProgressStepper({ signature }: { signature: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const update = useSelector((state: RootState) =>
    selectUpdateEntity(state.updateHistory, signature)
  );

  if (!update) {
    return null;
  }

  const steps = getUpdateSteps(update.state);

  const active =
    update.state === IUpdateState.COMPLETED
      ? steps.length
      : steps.findIndex((it) => it.loading || it.failed);

  const failedButRetryable = steps.findIndex((it) => it.failed) > 1; // if the first two steps fail we can't do a retry

  const handleRetry = async () => {
    await retryUpdate(signature);
    dispatch(
      updateUpdateEntity({
        ...update,
        state: IUpdateState.CONFIRMED,
        signature,
      })
    );
  };

  return (
    <>
      <Alert my={10} mb={25} color={"blue"} p={10}>
        <Text size={"xs"}>{signature}</Text>
      </Alert>

      <Stepper active={active} orientation="vertical" size={"xs"} mb={25}>
        {steps.map(({ loading, failed, message, label }) => (
          <Stepper.Step
            key={label}
            label={label}
            loading={loading}
            color={failed ? "red" : ""}
            description={failed ? message : ""}
            progressIcon={failed ? <X color={"red"} /> : null}
          />
        ))}
      </Stepper>

      {failedButRetryable && (
        <Button fullWidth={true} onClick={handleRetry}>
          Retry
        </Button>
      )}
    </>
  );
}
