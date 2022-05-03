import {
  Card,
  Text,
  Badge,
  Group,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import { useMetaplexMetadata } from "../../hooks/useMetaplexMetadata";
import { PublicKey } from "@solana/web3.js";
import React, { MouseEventHandler } from "react";
import { BurnActionButton } from "./BurnActionButton";
import { useSelector } from "react-redux";
import { selectOwnedTokens } from "../../redux/metadataSelectors";
import { getIsBurnt } from "../../helper/getAttribute";
import { ImageLoader } from "../ImageLoader";
import { useNavigate } from "react-router-dom";
import { InfamousData } from "../../models/InfamousMap";
import { selectListingById } from "../../redux/listingsState";
import { RootState } from "../../redux/store";

interface SingleTokenOverviewProps {
  data: InfamousData;
}

const useStyle = createStyles((theme) => ({
  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
  },

  sectionBorderless: {
    borderBottom: "none",
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
  },
}));

export function SingleTokenOverview({ data }: SingleTokenOverviewProps) {
  const { token, rarityScore } = data;
  const { classes, theme } = useStyle();
  const metadata = useMetaplexMetadata(new PublicKey(token));
  const navigate = useNavigate();
  const ownedTokens = useSelector(selectOwnedTokens);
  const tokenListing = useSelector((state: RootState) =>
    selectListingById(state.listings, token)
  );
  const isTokenOwned = ownedTokens.includes(token);

  const handleClick = () => {
    navigate("/thug/" + token);
  };

  return (
    <Card shadow="sm" p="xs">
      <Card.Section onClick={handleClick} style={{ cursor: "pointer" }}>
        <ImageLoader src={metadata?.image} width={"100%"} />
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position="apart">
          <Text size={"sm"} weight={500}>
            {metadata?.name}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.sectionBorderless}>
        <Badge color="blue" variant="light">
          Score: {getScore(rarityScore)}
        </Badge>
        {isTokenOwned && (
          <Badge color="pink" variant="light">
            {"Owned"}
          </Badge>
        )}
        {tokenListing && (
          <Badge
            color="green"
            variant="light"
            onClick={() => {
              window.location.href =
                "https://magiceden.io/item-details/" + token;
            }}
          >
            {`On Sale: ${tokenListing.price} SOL`}
          </Badge>
        )}
      </Card.Section>
    </Card>
  );
}

const getScore = (rarityScore: number | undefined): string => {
  if (!rarityScore) {
    return "0.00";
  }

  return (rarityScore * 100).toFixed(2);
};
