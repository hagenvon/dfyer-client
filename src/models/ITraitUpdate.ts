import { ITrait } from "./ITrait";

export interface ITraitUpdate {
  trait_type: string;
  value: string;
  rarity?: number;
  isCustomTrait: boolean; // = no original trait
  butterPrize: number;
  solPrize: number;
  limit?: number;
  count?: number;
  prize?: IUpdatePrize;
}

export interface IUpdatePrize {
  sol: number;
  [mint: string]: number;
}

export function mapToUpgradeTrait(update: ITraitUpdate): ITrait {
  return {
    trait_type: update.trait_type,
    value: update.value,
    timestamp: new Date().toISOString(),
  };
}
