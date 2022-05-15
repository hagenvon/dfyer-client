import {
  Card,
  Text,
  Badge,
  Group,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { useMetaplexMetadata } from "../../hooks/useMetaplexMetadata";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { birdLabels } from "../../constants/constants";
import { getRandomIntInclusive } from "../../helper/getRandomInt";
import { BurnActionButton } from "./BurnActionButton";
import { useSelector } from "react-redux";
import { selectOwnedTokens } from "../../redux/metadataSelectors";
import { getIsBurnt } from "../../helper/getAttribute";
import { ImageLoader } from "../ImageLoader";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { SectionImage } from "./SectionImage";
import { startStaking } from "../../api/claim.api";
import { SectionClaim } from "./SectionClaim";

interface SingleTokenProps {
  token: string;
}

export function SingleToken({ token }: SingleTokenProps) {
  const metadata = useMetaplexMetadata(new PublicKey(token));
  const ownedTokens = useSelector(selectOwnedTokens);
  const isTokenOwned = ownedTokens.includes(token);

  const canBurn = false; //isTokenOwned && !getIsBurnt(metadata);

  return (
    <Card shadow="sm" style={{ width: "100%", padding: 0 }}>
      <SectionImage src={metadata?.image} />
      <SectionHeader title={metadata?.name} />
      {isTokenOwned && <SectionClaim token={token} />}

      {canBurn && (
        <BurnActionButton
          token={token || ""}
          update={{
            trait_type: "Edition",
            value: "Burnt",
            butterPrize: 5,
            solPrize: 0.005,
            isCustomTrait: true,
          }}
        />
      )}
    </Card>
  );
}
