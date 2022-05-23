import { Box, Card } from "@mantine/core";
import { useMetaplexMetadata } from "../../hooks/useMetaplexMetadata";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { BurnActionButton } from "./BurnActionButton";
import { useSelector } from "react-redux";
import { selectOwnedTokens } from "../../redux/metadataSelectors";
import { getIsBurnt } from "../../helper/getAttribute";
import { SectionHeader } from "./SectionHeader";
import { SectionImage } from "./SectionImage";
import { SectionClaim } from "./SectionClaim";

interface SingleTokenProps {
  token: string;
}

export function SingleToken({ token }: SingleTokenProps) {
  const metadata = useMetaplexMetadata(new PublicKey(token));
  const ownedTokens = useSelector(selectOwnedTokens);
  const isTokenOwned = ownedTokens.includes(token);

  const canBurn = isTokenOwned && metadata && !getIsBurnt(metadata);

  if (!metadata) {
    return (
      <Card shadow="sm" style={{ width: "100%", padding: 20 }}>
        Loading...
      </Card>
    );
  }

  return (
    <Card shadow="sm" style={{ width: "100%", padding: 0 }}>
      <SectionImage src={metadata?.image} />
      <SectionHeader title={metadata?.name} />

      {isTokenOwned && <SectionClaim token={token} />}

      {canBurn && (
        <Box style={{ padding: "16px" }}>
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
        </Box>
      )}
    </Card>
  );
}
