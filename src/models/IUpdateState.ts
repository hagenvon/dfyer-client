export enum IUpdateState {
  CREATED = "CREATED",
  CONFIRMED = "CONFIRMED",
  VALIDATED = "VALIDATED",
  INVALID = "INVALID",
  RENDERING = "RENDERING",
  RENDERED = "RENDERED",
  FILES_UPLOADED = "FILES_UPLOADED",
  METADATA_UPDATE_TX_CREATED = "METADATA_UPDATE_TX_CREATED",
  COMPLETED = "COMPLETED",
}

export interface UpdateStateUpdatePayload {
  signature: string;
  state: IUpdateState;
}
