import { getUpdateSteps } from "./getUpdateSteps";
import { IUpdateEntity } from "../../models/IUpdateEntity";
import { IUpdateState, retryableUpdateStates } from "../../models/IUpdateState";
import { Button, Group, Loader } from "@mantine/core";
import { Check, X } from "tabler-icons-react";
import { useFetchUpdateItem } from "../../hooks/useFetchUpdateItem";
import { retryUpdate } from "../../api/updateTrait";
import { updateUpdateEntity } from "../../redux/updateHistoryState";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { differenceInMinutes } from "date-fns";

export function InlineProgress({
  updateHistoryItem,
}: {
  updateHistoryItem: IUpdateEntity;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const handleRetry = async () => {
    await retryUpdate(updateHistoryItem.signature);
    dispatch(
      updateUpdateEntity({
        ...updateHistoryItem,
        state: IUpdateState.CONFIRMED,
      })
    );
  };

  const steps = getUpdateSteps(updateHistoryItem.state);

  useFetchUpdateItem(updateHistoryItem.signature);

  const isComplete = updateHistoryItem.state === IUpdateState.COMPLETED;

  const active = isComplete
    ? steps.length
    : steps.findIndex((it) => it.loading || it.failed);

  const failedButRetryable =
    retryableUpdateStates.includes(updateHistoryItem.state) ||
    (updateHistoryItem.state === IUpdateState.CREATED &&
      isTransactionConfirmTimedOut(updateHistoryItem.updatedAt));

  if (isComplete) {
    return (
      <Group align={"center"} style={{ flexGrow: "1" }}>
        <Check strokeWidth={2} color={"green"} /> Complete
      </Group>
    );
  }

  return (
    <Group position={"apart"} align={"center"} style={{ flexGrow: "1" }}>
      {steps[active].loading && (
        <Group align={"center"}>
          <Loader size={24} /> {steps[active].label}
        </Group>
      )}
      {steps[active].failed && (
        <Group align={"center"}>
          <Group align={"center"}>
            <X color={"red"} strokeWidth={2} /> {steps[active].message}
          </Group>
        </Group>
      )}
      {failedButRetryable && (
        <Button size={"xs"} onClick={handleRetry}>
          Retry
        </Button>
      )}
    </Group>
  );
}

function isTransactionConfirmTimedOut(dateString: string) {
  return differenceInMinutes(new Date(dateString), new Date()) > 3;
}
