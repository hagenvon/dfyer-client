import { createStyles, Badge, Group } from "@mantine/core";
import React from "react";
import { UpdateActionButton } from "./UpdateActionButton";
import { ITraitUpdate } from "../../models/ITraitUpdate";
import { TraitItem } from "./TraitItem";

interface UpdateItemProps {
  update: ITraitUpdate;
  canUpdate: boolean;
  token: string;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
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

export function UpdateItem({ canUpdate, update, token }: UpdateItemProps) {
  const { classes } = useStyles();

  const limitDisplay = update.limit ? `${update.count}/${update.limit}` : "";

  return (
    <div className={classes.wrapper}>
      <Group spacing={12}>
        <TraitItem trait={update} />
        <div>
          {update.isCustomTrait && <Badge color="primary">Upgrade</Badge>}
          {limitDisplay && <Badge color="green">Limited: {limitDisplay}</Badge>}
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
  );
}
