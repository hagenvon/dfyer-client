import { Card, Text, Badge, Group, useMantineTheme, Box } from "@mantine/core";
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

interface TokenThumbnailProps {
  token: string;
}

export function TokenThumbnail({ token }: TokenThumbnailProps) {
  const metadata = useMetaplexMetadata(new PublicKey(token));
  return (
    <Box style={{ cursor: "pointer" }}>
      <ImageLoader src={metadata ? metadata.image : ""} width={"100%"} />
    </Box>
  );
}
