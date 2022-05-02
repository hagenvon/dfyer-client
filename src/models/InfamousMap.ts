import { IMetaData } from "./IMetaData";

export interface InfamousMap {
  [token: string]: InfamousData;
}

export interface InfamousData {
  token: string;
  metadata: IMetaData;
  rarityScore?: number;
}
