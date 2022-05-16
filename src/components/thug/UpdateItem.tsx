import { createStyles, Badge, Group, Text } from "@mantine/core";
import React from "react";
import { UpdateActionButton } from "./UpdateActionButton";
import { ITraitUpdate } from "../../models/ITraitUpdate";
import { TraitItem } from "./TraitItem";
import { useSelector } from "react-redux";
import { selectButterBalance, selectSolBalance } from "../../redux/uiSelectors";

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
  const butterBalance = useSelector(selectButterBalance);
  const solBalance = useSelector(selectSolBalance);

  const isAffordable =
    update.solPrize <= solBalance && update.butterPrize <= butterBalance;

  const limitDisplay = update.limit ? `${update.count}/${update.limit}` : "";

  return (
    <div className={classes.wrapper}>
      <Group spacing={12}>
        <TraitItem trait={update} />
        <Group spacing={4}>
          {update.isCustomTrait ? (
            <Badge color="primary">Upgrade</Badge>
          ) : (
            <Badge color="gray">Classic</Badge>
          )}
          {limitDisplay && <Badge color="red">Limited: {limitDisplay}</Badge>}
        </Group>
      </Group>
      <Group spacing={4}>
        <Badge color={isAffordable ? "green" : "gray"} variant="light">
          {update.solPrize} SOL, {update.butterPrize} BUTTER
        </Badge>
        {canUpdate && (
          <UpdateActionButton
            token={token}
            update={update}
            disabled={!isAffordable}
          />
        )}
      </Group>
    </div>
  );
}
