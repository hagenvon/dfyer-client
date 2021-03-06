import { axiosInstance } from "./axiosInstance";
import { IClaim } from "../models/IClaim";
import { IReward } from "../models/IReward";

export async function startStaking(token: string): Promise<IClaim> {
  const { data } = await axiosInstance.get<IClaim>(`/api/stake/${token}`);

  return data;
}

export async function getAllClaims(wallet: string): Promise<IClaim[]> {
  const { data } = await axiosInstance.get<IClaim[]>(`/api/claims/${wallet}`);

  return data;
}

export async function getSingleReward(
  wallet: string,
  token: string
): Promise<IClaim> {
  const { data } = await axiosInstance.get<IClaim>(
    `/api/reward/${token}/${wallet}`
  );

  return data;
}

export async function getAllRewards(wallet: string): Promise<IClaim[]> {
  const { data } = await axiosInstance.get<IClaim[]>(
    `/api/reward-all/${wallet}`
  );

  return data;
}

export async function getRewardConfig(): Promise<IReward> {
  const { data } = await axiosInstance.get<IReward>(`/api/rewards`);

  return data;
}
