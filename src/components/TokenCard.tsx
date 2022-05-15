import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
  createStyles,
  SimpleGrid,
} from "@mantine/core";
import { useMetaplexMetadata } from "../hooks/useMetaplexMetadata";
import { PublicKey } from "@solana/web3.js";
import { useAvailableUpdates } from "../hooks/useAvailableUpdates";
import React from "react";
import { birdLabels } from "../constants/constants";
import { getRandomIntInclusive } from "../helper/getRandomInt";
import { useNavigate } from "react-router-dom";
import { TraitItem } from "./thug/TraitItem";
import { SectionClaim } from "./thug/SectionClaim";
import { useDispatch } from "react-redux";
import { claimSingleReward } from "../redux/claimState";

interface TokenCardProps {
  token: string;
}

const useStyles = createStyles((theme) => ({
  header: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
  },
}));

export function TokenCard({ token }: TokenCardProps) {
  const theme = useMantineTheme();
  const metaData = useMetaplexMetadata(new PublicKey(token));
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { classes } = useStyles();

  const attributes = metaData?.attributes.map((trait, index) => (
    <TraitItem key={index} trait={trait} />
  ));

  const handleCustomize = () => {
    navigate("/thug/" + token);
  };

  return (
    <Card shadow="sm" p="md">
      <Card.Section>
        <img src={metaData?.image} alt="" width={"100%"} />
      </Card.Section>

      <Card.Section className={classes.header}>
        <Group position="apart">
          <Text weight={500}>{metaData?.name}</Text>
          <Badge color="pink" variant="light">
            {birdLabels[getRandomIntInclusive(0, birdLabels.length - 1)]}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section mb={15}>
        <SectionClaim token={token} />
      </Card.Section>

      <Button fullWidth style={{ marginTop: 10 }} onClick={handleCustomize}>
        Customize Now!
      </Button>

      <SimpleGrid cols={2} spacing={"xs"} mt={"sm"} mb={"md"}>
        {attributes}
      </SimpleGrid>
    </Card>
  );
}
