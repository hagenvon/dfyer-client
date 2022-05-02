import { ITraitUpdate } from "../models/ITraitUpdate";
import { axiosInstance } from "./axiosInstance";

export async function fetchAvailableUpdates(
  token: string
): Promise<ITraitUpdate[]> {
  const { data } = await axiosInstance.get<ITraitUpdate[]>(
    `/api/update/list/${token}`
  );

  return data;
}
