import {
  Card,
  Text,
  useMantineTheme,
  createStyles,
  Badge,
  LoadingOverlay,
  Group,
} from "@mantine/core";
import { useAvailableUpdates } from "../../hooks/useAvailableUpdates";
import React from "react";
import { UpdateActionButton } from "./UpdateActionButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useWallet } from "@solana/wallet-adapter-react";
import { selectOwnedTokens } from "../../redux/metadataSelectors";

interface TokenCardProps {
  token: string;
}

const useStyles = createStyles((theme) => ({
  attributes: {
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    flexWrap: "wrap",
  },
  attribute: {
    minWidth: "100%",
    maxWidth: "100%",
    padding: "3px 0",
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export function AvailableUpdates({ token }: TokenCardProps) {
  const { connected } = useWallet();
  const { availableUpdates, isFetching } = useAvailableUpdates(token);
  const isUpdating: boolean = useSelector(
    (state: RootState) => state.ui.isUpdating
  );

  const ownedTokens = useSelector(selectOwnedTokens);
  const isTokenOwned = ownedTokens.includes(token);

  const canUpdate = isTokenOwned && connected;

  const { classes, theme } = useStyles();

  const items = availableUpdates.map((update, index) => (
    <div key={index} className={classes.attribute}>
      <Group spacing={12}>
        <div>
          <Text size="xs" color="dimmed">
            {update.trait_type}
          </Text>
          <Text weight={500} size="sm">
            {update.value}
          </Text>
        </div>
        <div>
          {update.isCustomTrait && <Badge color="primary">Upgrade</Badge>}
        </div>
      </Group>
      <Group spacing={4}>
        <Badge color="green" variant="light">
          {update.solPrize} SOL
        </Badge>
        <Badge color="blue" variant="light">
          {update.butterPrize} BUTTER
        </Badge>
        {canUpdate && <UpdateActionButton token={token} update={update} />}
      </Group>
    </div>
  ));

  return (
    <Card shadow="sm" p="md" component={"div"}>
      <Text weight={500}>Available Updates:</Text>
      {/*<LoadingOverlay visible={isUpdating} />*/}

      <Card.Section className={classes.attributes}>
        {isFetching ? (
          <div style={{ height: 200, position: "relative" }}>
            <LoadingOverlay visible={true} />
          </div>
        ) : (
          items
        )}
      </Card.Section>
    </Card>
  );
}
