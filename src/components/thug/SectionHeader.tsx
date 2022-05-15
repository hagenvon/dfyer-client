import { Card, Text, Group, createStyles } from "@mantine/core";

import React, { ReactNode } from "react";

interface CardSectionHeaderProps {
  title: string;
  children?: ReactNode;
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

export function SectionHeader({ title, children }: CardSectionHeaderProps) {
  const { classes } = useStyles();

  return (
    <Group position="apart" className={classes.header}>
      <Text weight={500}>{title}</Text>
      {children}
    </Group>
  );
}
