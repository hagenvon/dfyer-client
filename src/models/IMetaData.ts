import { ITrait } from "./ITrait";

export interface IMetaData {
  name: string;
  image: string;
  attributes: ITrait[];
  properties?: any;
  description?: string;
  seller_fee_basis_points: number;
  symbol: string;
  external_url: string;
  collection: any;
}
