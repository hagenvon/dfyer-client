import { Card, Text, Badge, Group, useMantineTheme } from "@mantine/core";
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

interface SingleTokenProps {
  token: string;
  isThumbnail?: boolean;
  isRanking?: boolean;
}

export function SingleToken({
  token,
  isThumbnail = false,
  isRanking = false,
}: SingleTokenProps) {
  const theme = useMantineTheme();
  const metadata = useMetaplexMetadata(new PublicKey(token));
  const navigate = useNavigate();
  const ownedTokens = useSelector(selectOwnedTokens);
  const isTokenOwned = ownedTokens.includes(token);

  const canBurn = false; //isTokenOwned && !getIsBurnt(metadata);

  const handleClick = () => {
    navigate("/thug/" + token);
  };

  return (
    <Card
      shadow="sm"
      p="md"
      style={{ cursor: isThumbnail ? "pointer" : "inherit", width: "100%" }}
      onClick={handleClick}
    >
      <Card.Section>
        <ImageLoader src={metadata?.image} width={"100%"} />
      </Card.Section>

      {isRanking && (
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{metadata?.name}</Text>
        </Group>
      )}

      {!isThumbnail && (
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{metadata?.name}</Text>
          <Badge color="pink" variant="light">
            {birdLabels[getRandomIntInclusive(0, birdLabels.length - 1)]}
          </Badge>

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
        </Group>
      )}
    </Card>
  );
}
