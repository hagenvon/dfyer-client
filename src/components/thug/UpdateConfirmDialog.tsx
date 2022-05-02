import { Badge, Box, createStyles, Text } from "@mantine/core";
import { Preview } from "../preview/Preview";
import React from "react";
import { ITraitUpdate } from "../../models/ITraitUpdate";

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

export function UpdateConfirmDialog({
  update,
  token,
}: {
  update: ITraitUpdate;
  token: string;
}) {
  const { classes } = useStyles();

  return (
    <Text size="sm">
      You are about to update your Infamous Thug with:
      <Box className={classes.attribute} my={3}>
        <div>
          <Text size="xs" color="dimmed">
            {update.trait_type}
          </Text>
          <Text weight={500} size="sm">
            {update.value}
          </Text>
        </div>
        <div style={{ display: "flex" }}>
          <Badge color="green" variant="light">
            {update.solPrize} SOL
          </Badge>
          <Badge color="blue" variant="light">
            {update.butterPrize} BUTTER
          </Badge>
        </div>
      </Box>
      <Preview token={token} traits={[update]} size={400} />
    </Text>
  );
}
