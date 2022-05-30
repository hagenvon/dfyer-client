export enum IUpdateState {
  CREATED = "CREATED",
  CONFIRMED = "CONFIRMED",
  NOT_CONFIRMED = "NOT_CONFIRMED",
  VALIDATED = "VALIDATED",
  INVALID = "INVALID",
  RENDERING = "RENDERING",
  RENDERING_FAILED = "RENDERING_FAILED",
  RENDERED = "RENDERED",
  FILES_UPLOADED = "FILES_UPLOADED",
  FILES_UPLOADED_FAILED = "FILES_UPLOADED_FAILED",
  METADATA_UPDATE_TX_CREATED = "METADATA_UPDATE_TX_CREATED",
  METADATA_UPDATE_TX_FAILED = "METADATA_UPDATE_TX_FAILED",
  COMPLETED = "COMPLETED",
}

export interface UpdateStateUpdatePayload {
  signature: string;
  state: IUpdateState;
}

export const nonActiveUpdateStates = [
  IUpdateState.INVALID,
  IUpdateState.COMPLETED,
  IUpdateState.NOT_CONFIRMED,
  IUpdateState.METADATA_UPDATE_TX_FAILED,
  IUpdateState.FILES_UPLOADED_FAILED,
  IUpdateState.RENDERING_FAILED,
];

export const retryableUpdateStates = [
  IUpdateState.NOT_CONFIRMED,
  IUpdateState.METADATA_UPDATE_TX_FAILED,
  IUpdateState.FILES_UPLOADED_FAILED,
  IUpdateState.RENDERING_FAILED,
];
