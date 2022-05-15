export interface IClaim {
  amount: number;
  lastClaim: string;
  token: string;
  isClaimable: boolean;
  claimableAt: string;
}

export interface IClaimAmount {
  amount: number;
  isClaimable: boolean;
}
