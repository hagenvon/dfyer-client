import { Alert, Stepper, Text } from "@mantine/core";
import { IUpdateState } from "../../models/IUpdateState";
import { useSelector } from "react-redux";
import { selectActiveTransactionState } from "../../redux/metadataSelectors";
import { RootState } from "../../redux/store";
import { X } from "tabler-icons-react";

export function ProgressStepper({ signature }: { signature: string }) {
  const update = useSelector((state: RootState) =>
    selectActiveTransactionState(state, signature)
  );

  const getSteps = (state: IUpdateState) => [
    {
      label: "Process Transaction (Solana)",
      loading: state === IUpdateState.CREATED,
      failed: state === IUpdateState.NOT_CONFIRMED,
      message: "Not confirmed",
    },
    {
      label: "Verify Transaction",
      loading: state === IUpdateState.CONFIRMED,
      failed: state === IUpdateState.INVALID,
      message: "Transaction invalid",
    },
    {
      label: "Create Files",
      loading: [IUpdateState.VALIDATED, IUpdateState.RENDERING].includes(state),
      failed: false,
      message: "Rendering failed",
    },
    {
      label: "Upload Files",
      loading: state === IUpdateState.RENDERED,
      failed: false,
      message: "Rendering failed",
    },
    {
      label: "Update Metadata (Solana)",
      loading: [
        IUpdateState.FILES_UPLOADED,
        IUpdateState.METADATA_UPDATE_TX_CREATED,
      ].includes(state),
      failed: false,
      message: "Update Transaction failed",
    },
  ];

  const steps = getSteps(update.state);

  const active =
    update.state === IUpdateState.COMPLETED
      ? steps.length
      : steps.findIndex((it) => it.loading || it.failed);

  return (
    <>
      <Alert my={10} mb={25} color={"blue"} p={10}>
        <Text size={"xs"}>{signature}</Text>
      </Alert>

      <Stepper active={active} orientation="vertical" size={"xs"} mb={25}>
        {steps.map(({ loading, failed, message, label }) => (
          <Stepper.Step
            label={label}
            loading={loading}
            color={failed ? "red" : ""}
            description={failed ? message : ""}
            progressIcon={failed ? <X color={"red"} /> : null}
          />
        ))}
      </Stepper>
    </>
  );
}
