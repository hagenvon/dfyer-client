import { axiosInstance } from "./axiosInstance";
import { ITraitUpdate } from "../models/ITraitUpdate";

export async function getBurnEdition(): Promise<ITraitUpdate> {
  const { data } = await axiosInstance.get<ITraitUpdate>(`/api/editions/burn`);

  return data;
}
