import { ITraitUpdate } from "./ITraitUpdate";

export interface IUpdateRequestParams {
  signature: string;
  fromKey: string;
  update: ITraitUpdate;
  token: string;
  type: "CUSTOMIZE" | "BURN";
}
