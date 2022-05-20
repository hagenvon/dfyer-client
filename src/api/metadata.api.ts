import { axiosInstance } from "./axiosInstance";
import { InfamousData, InfamousMap } from "../models/InfamousMap";

export async function getAllMetadata(): Promise<InfamousMap> {
  const { data } = await axiosInstance.get<InfamousMap>(`/api/metadata/list`);

  return data;
}

export async function getMetadata(token: string): Promise<InfamousData> {
  const { data } = await axiosInstance.get<InfamousData>(
    `/api/metadata/single/${token}`
  );

  return data;
}
