import { IUpdateState } from "../../models/IUpdateState";

export const getUpdateSteps = (state: IUpdateState) => [
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
    failed: state === IUpdateState.RENDERING_FAILED,
    message: "Rendering failed",
  },
  {
    label: "Upload Files",
    loading: state === IUpdateState.RENDERED,
    failed: state === IUpdateState.FILES_UPLOADED_FAILED,
    message: "Upload failed",
  },
  {
    label: "Update Metadata (Solana)",
    loading: [
      IUpdateState.FILES_UPLOADED,
      IUpdateState.METADATA_UPDATE_TX_CREATED,
    ].includes(state),
    failed: state === IUpdateState.METADATA_UPDATE_TX_FAILED,
    message: "Update Transaction failed. Please retry.",
  },
];
