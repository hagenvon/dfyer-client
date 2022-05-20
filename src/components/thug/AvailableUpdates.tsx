import { Card, Text, createStyles, LoadingOverlay } from "@mantine/core";
import React from "react";
import { ITraitUpdate } from "../../models/ITraitUpdate";
import { UpdateItem } from "./UpdateItem";
import { stringifyFilterTrait } from "../../helper/filterTraitString";
import { SectionHeader } from "./SectionHeader";

interface AvailableUpdatesProps {
  canUpdate: boolean;
  availableTraits: ITraitUpdate[];
  isFetching: boolean;
  token: string;
  label: string;
}

const useStyles = createStyles((theme) => ({
  updateList: {
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    flexWrap: "wrap",
  },
}));

export function AvailableUpdates({
  canUpdate,
  availableTraits,
  isFetching,
  token,
  label,
}: AvailableUpdatesProps) {
  const { classes } = useStyles();

  const items = availableTraits.map((update, index) => (
    <UpdateItem
      update={update}
      canUpdate={canUpdate}
      token={token}
      key={stringifyFilterTrait(update)}
    />
  ));

  return (
    <Card shadow="sm" p="md" component={"div"} mb={"md"}>
      <Card.Section>
        <SectionHeader title={label} />
      </Card.Section>

      {/*<LoadingOverlay visible={isUpdating} />*/}

      <Card.Section className={classes.updateList}>
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
