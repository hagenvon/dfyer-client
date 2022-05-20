import { ITrait } from "./ITrait";

export interface IReward {
  lockedPeriod: number;
  reward: IPrize;
  interval: number;
  bonus: IRewardBonus[];
}

export interface IRewardBonus {
  trait: ITrait;
  reward: IPrize;
}

export interface IPrize {
  mint: string;
  amount: number;
}
