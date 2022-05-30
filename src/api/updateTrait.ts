import { IUpdateRequestParams } from "../models/IUpdateRequestParams";
import { axiosInstance } from "./axiosInstance";
import { ITrait } from "../models/ITrait";
import { IUpdateState } from "../models/IUpdateState";
import { IUpdateEntity } from "../models/IUpdateEntity";

export async function updateTrait(
  params: IUpdateRequestParams
): Promise<IUpdateState> {
  const { data } = await axiosInstance.post<IUpdateState>(
    `/api/update/${params.token}`,
    params
  );

  return data;
}

export async function getUpdateState(signature: string): Promise<IUpdateState> {
  const { data } = await axiosInstance.get<IUpdateState>(
    `/api/update/state/${signature}`
  );

  return data;
}

export async function preview(params: {
  token: string;
  traits: ITrait[];
  size?: number;
}) {
  const { data } = await axiosInstance.post(
    `/api/preview/${params.token}?size=${params.size || 240}`,
    params.traits,
    { responseType: "blob" }
  );

  return data;
}

export async function retryUpdate(signature: string): Promise<boolean> {
  const { data } = await axiosInstance.get<boolean>(
    `/api/update/retry/${signature}`
  );

  return data;
}

export async function getUpdateHistory(
  wallet: string
): Promise<IUpdateEntity[]> {
  const { data } = await axiosInstance.get<IUpdateEntity[]>(
    `/api/updates/history/${wallet}`
  );

  return data;
}

export async function getUpdateHistoryPerToken(
  token: string
): Promise<IUpdateEntity[]> {
  const { data } = await axiosInstance.get<IUpdateEntity[]>(
    `/api/updates/history/token/${token}`
  );

  return data;
}

export async function getUpdateEntity(
  signature: string
): Promise<IUpdateEntity> {
  const { data } = await axiosInstance.get<IUpdateEntity>(
    `/api/update/item/${signature}`
  );

  return data;
}
