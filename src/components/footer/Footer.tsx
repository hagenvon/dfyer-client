import React from "react";
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Text,
} from "@mantine/core";
import { BrandTwitter, BrandDiscord } from "tabler-icons-react";
import { InfamousLogo } from "../InfamousLogo";
import { ThemeToggle } from "../ThemeToggler";
import { InfamousLogoShorten } from "../InfamousLogoShorten";
const version = require("../../../package.json").version;

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
      alignItems: "center",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
  },
  innerGroup: {
    alignItems: "flex-start",
    [theme.fn.smallerThan("xs")]: {
      alignItems: "center",
    },
  },
}));

export function FooterDefault() {
  const { classes, theme } = useStyles();

  const isLightTheme = theme.colorScheme === "light";

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group direction={"column"} spacing={0} className={classes.innerGroup}>
          <InfamousLogo height={24} fill={isLightTheme ? "#333" : "#fff"} />
          <Text mt={8} size={"sm"}>
            2022 by @hhkonz1 | DFyer {version}
          </Text>
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
        <Group
          direction={"column"}
          spacing={0}
          align={theme.fn.smallerThan("xs") ? "center" : "flex-end"}
        >
          {isLightTheme
            ? "I don't trust light themes!"
            : "I don't trust dark themes!"}
          <ThemeToggle />
        </Group>
      </Container>
    </div>
  );
}
