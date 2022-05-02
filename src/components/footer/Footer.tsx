import React from "react";
import { createStyles, Container, Group, ActionIcon } from "@mantine/core";
import { BrandTwitter, BrandDiscord } from "tabler-icons-react";
import { InfamousLogo } from "../InfamousLogo";
import { ThemeToggle } from "../ThemeToggler";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function FooterDefault() {
  const { classes, theme } = useStyles();

  const isLightTheme = theme.colorScheme === "light";

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group direction={"column"} spacing={0}>
          <InfamousLogo height={24} fill={isLightTheme ? "#333" : "#fff"} />
        </Group>

        <Group
          spacing={8}
          className={classes.links}
          position="right"
          noWrap
          mr={15}
        >
          <ActionIcon size="lg">
            <BrandTwitter size={32} strokeWidth={1} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandDiscord size={32} strokeWidth={1} />
          </ActionIcon>
        </Group>
        <Group direction={"column"} spacing={0} align={"flex-end"}>
          {isLightTheme
            ? "I don't trust light themes!"
            : "I don't trust dark themes!"}
          <ThemeToggle />
        </Group>
      </Container>
    </div>
  );
}
