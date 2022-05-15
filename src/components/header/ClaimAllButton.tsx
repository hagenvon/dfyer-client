import { Button, useMantineTheme } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { claimAllRewards } from "../../redux/claimState";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  selectIsClaimingAll,
  selectIsClaimingAny,
  selectTotalClaimableButter,
} from "../../redux/claimSelectors";

export function ClaimAllButton() {
  const { publicKey, connected } = useWallet();
  const dispatch = useDispatch();
  const claimable = useSelector(selectTotalClaimableButter);
  const isClaimingAll = useSelector(selectIsClaimingAll);
  const isClaimingAny = useSelector(selectIsClaimingAny);

  const theme = useMantineTheme();

  const handleClaimAll = () =>
    // @ts-ignore
    dispatch(claimAllRewards(publicKey));

  if (!connected || claimable <= 0) {
    return null;
  }

  return (
    <Button
      variant={theme.colorScheme === "dark" ? "light" : "white"}
      color={"green"}
      onClick={handleClaimAll}
      loading={isClaimingAll}
      disabled={isClaimingAny}
    >
      Claim all ({claimable} BUTTER)
    </Button>
  );
}
