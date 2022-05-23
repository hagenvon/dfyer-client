import { Text, Group, Box, Button, Alert, ColorSwatch } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  claimSingleReward,
  selectClaimById,
  startClaiming,
} from "../../redux/claimState";
import { AppDispatch, RootState } from "../../redux/store";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  selectIsClaimingAll,
  selectIsClaimingOne,
} from "../../redux/claimSelectors";
import formatDistance from "date-fns/formatDistance";

interface SectionClaimProps {
  token: string;
}

export function SectionClaim({ token }: SectionClaimProps) {
  const { publicKey } = useWallet();

  const [isFetching, setIsFetching] = useState(false);

  const claim = useSelector((state: RootState) =>
    selectClaimById(state.claims, token)
  );

  const isClaimingThis = useSelector(selectIsClaimingOne(token));
  const isClaimingAll = useSelector(selectIsClaimingAll);

  const dispatch = useDispatch<AppDispatch>();

  const handleStartEarning = () => {
    setIsFetching(true);
    dispatch(startClaiming(token));
  };

  const handleClaim = () => {
    if (!publicKey) return;

    dispatch(claimSingleReward({ token, wallet: publicKey?.toBase58() }));
  };

  return (
    <Box px={claim ? 0 : "md"} pt={claim ? 0 : "md"}>
      {claim ? (
        <Alert color="gray">
          <Group position={"apart"} align={"center"} spacing={5}>
            <Group align={"center"} spacing={5}>
              <ColorSwatch color={"green"} size={10} />
              <Text weight={500} size={"sm"}>
                This Bird butters!
              </Text>
            </Group>
            <Text size={"xs"}>
              {getDistanceString(
                new Date().getTime(),
                new Date(claim.claimableAt).getTime()
              )}
            </Text>
          </Group>
          {
            <Button
              mt={10}
              variant={"outline"}
              color={"green"}
              disabled={!claim.isClaimable}
              fullWidth={true}
              onClick={handleClaim}
              loading={claim.isClaimable && (isClaimingAll || isClaimingThis)}
            >
              Grab {claim.amount} BUTTER
            </Button>
          }
        </Alert>
      ) : (
        <Button
          fullWidth={true}
          onClick={handleStartEarning}
          variant="light"
          loading={isFetching}
        >
          Make me some $Butter!
        </Button>
      )}
    </Box>
  );
}

function getDistanceString(now: number, targetTime: number): string {
  if (now > targetTime) {
    return "";
  }

  return "available in " + formatDistance(new Date(now), new Date(targetTime));
}
