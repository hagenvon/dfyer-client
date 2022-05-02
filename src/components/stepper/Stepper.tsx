import { Alert, Box, Code, Stepper, Text } from "@mantine/core";
import { IUpdateState } from "../../models/IUpdateState";
import { useSelector } from "react-redux";
import { selectActiveTransactionState } from "../../redux/metadataSelectors";
import { RootState } from "../../redux/store";

export function ProgressStepper({ signature }: { signature: string }) {
  const update = useSelector((state: RootState) =>
    selectActiveTransactionState(state, signature)
  );

  let active = 0;

  switch (update.state) {
    case IUpdateState.CREATED:
      active = 0;
      break;
    case IUpdateState.CONFIRMED:
      active = 1;
      break;
    case IUpdateState.INVALID:
      active = 1;
      break;
    case IUpdateState.VALIDATED:
      active = 2;
      break;
    case IUpdateState.RENDERING:
      active = 2;
      break;
    case IUpdateState.RENDERED:
      active = 3;
      break;
    case IUpdateState.FILES_UPLOADED:
      active = 4;
      break;
    case IUpdateState.METADATA_UPDATE_TX_CREATED:
      active = 4;
      break;
    case IUpdateState.COMPLETED:
      active = 5;
      break;

    default:
      active = 0;
  }

  return (
    <>
      <Alert my={10} mb={25} color={"blue"} p={10}>
        <Text size={"xs"}>{signature}</Text>
      </Alert>

      <Stepper active={active} orientation="vertical" size={"xs"} mb={25}>
        <Stepper.Step
          label="Process Transaction (Solana)"
          loading={active === 0}
        />
        <Stepper.Step label="Verify Transaction" loading={active === 1} />
        <Stepper.Step label="Create Files" loading={active === 2} />
        <Stepper.Step label="Upload Files" loading={active === 3} />
        <Stepper.Step
          label="Updating Metadata (Solana)"
          loading={active === 4}
        />
      </Stepper>
    </>
  );
}
