import { ITraitUpdate } from "./ITraitUpdate";
import { IUpdateState } from "./IUpdateState";

export interface IUpdateEntity {
  signature: string;
  fromPublicKey: string;
  traitUpdates: ITraitUpdate;
  token: string;
  type: "CUSTOMIZE" | "BURN";
  state: IUpdateState;
  updateSignature: string;
  updatedAt: string;
}
