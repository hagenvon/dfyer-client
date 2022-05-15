import {
  Text,
  Group,
  Box,
  Button,
  Alert,
  ColorSwatch,
  Badge,
} from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  claimSingleReward,
  selectClaimById,
  startClaiming,
} from "../../redux/claimState";
import { RootState } from "../../redux/store";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  selectIsClaimingAll,
  selectIsClaimingOne,
} from "../../redux/claimSelectors";

interface SectionClaimProps {
  token: string;
}

export function SectionClaim({ token }: SectionClaimProps) {
  const { publicKey } = useWallet();

  const claim = useSelector((state: RootState) =>
    selectClaimById(state.claims, token)
  );

  const isClaimingThis = useSelector(selectIsClaimingOne(token));
  const isClaimingAll = useSelector(selectIsClaimingAll);

  const dispatch = useDispatch();
  // @ts-ignore
  const handleStartEarning = () => dispatch(startClaiming(token));

  const handleClaim = () =>
    // @ts-ignore
    dispatch(claimSingleReward({ token, wallet: publicKey?.toBase58() }));

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
              available at {new Date(claim.claimableAt).toLocaleDateString()}
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
        <Button fullWidth={true} onClick={handleStartEarning} variant="light">
          Make me some $Butter!
        </Button>
      )}
    </Box>
  );
}
