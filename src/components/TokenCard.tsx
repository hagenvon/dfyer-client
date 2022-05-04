import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import { useMetaplexMetadata } from "../hooks/useMetaplexMetadata";
import { PublicKey } from "@solana/web3.js";
import { useAvailableUpdates } from "../hooks/useAvailableUpdates";
import React from "react";
import { birdLabels } from "../constants/constants";
import { getRandomIntInclusive } from "../helper/getRandomInt";
import { useNavigate } from "react-router-dom";

interface TokenCardProps {
  token: string;
}

const useStyles = createStyles((theme) => ({
  attributes: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    flexWrap: "wrap",
  },
  attribute: {
    minWidth: "50%",
    maxWidth: "50%",
    marginBottom: "6px",
    flexWrap: "wrap",
  },
}));

export function TokenCard({ token }: TokenCardProps) {
  const theme = useMantineTheme();
  const metaData = useMetaplexMetadata(new PublicKey(token));
  const navigate = useNavigate();

  const { classes } = useStyles();

  const attributes = metaData?.attributes.map((updates, index) => (
    <div key={index} className={classes.attribute}>
      <Text size="xs" color="dimmed">
        {updates.trait_type}
      </Text>
      <Text weight={500} size="sm" pr={6}>
        {updates.value}
      </Text>
    </div>
  ));

  const handleCustomize = () => {
    navigate("/thug/" + token);
  };

  return (
    <Card shadow="sm" p="md">
      <Card.Section>
        <img src={metaData?.image} alt="" width={"100%"} />
      </Card.Section>

      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text weight={500}>{metaData?.name}</Text>
        <Badge color="pink" variant="light">
          {birdLabels[getRandomIntInclusive(0, birdLabels.length - 1)]}
        </Badge>
      </Group>

      <Card.Section className={classes.attributes}>{attributes}</Card.Section>

      <Button
        variant="light"
        fullWidth
        style={{ marginTop: 10 }}
        onClick={handleCustomize}
      >
        Customize Now!
      </Button>
    </Card>
  );
}
