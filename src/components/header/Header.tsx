import React, { useState } from "react";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Navbar,
  Drawer,
  Button,
  Box,
  Stack,
  MediaQuery,
} from "@mantine/core";
import { useBooleanToggle, useMediaQuery } from "@mantine/hooks";
import { BrandTwitter, BrandDiscord } from "tabler-icons-react";
import { InfamousLogo } from "../InfamousLogo";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { InfamousLogoShorten } from "../InfamousLogoShorten";
import { ConnectButton } from "../connect-button/ConnectButton";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: 320,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: 320,
    justifyContent: "flex-end",

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
    },
  },
}));

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
}

export function HeaderMiddle({ links }: HeaderMiddleProps) {
  const location = useLocation();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx, theme } = useStyles();
  const navigate = useNavigate();
  const breakpointMatch = useMediaQuery("(min-width: 900px)");

  const isLandingPage = location.pathname === "/";

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: location.pathname === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <>
      <Header height={56}>
        <Container className={classes.inner}>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size="sm"
            className={classes.burger}
          />
          <Group className={classes.links} spacing={5} noWrap={true}>
            {items}
          </Group>

          <Group>
            {!isLandingPage && (
              <Box onClick={() => navigate("/")}>
                {breakpointMatch ? (
                  <InfamousLogo
                    fill={theme.colorScheme === "light" ? "#333" : "#fff"}
                    height={36}
                  />
                ) : (
                  <InfamousLogoShorten
                    fill={theme.colorScheme === "light" ? "#333" : "#fff"}
                    height={30}
                  />
                )}
              </Box>
            )}
          </Group>
          <Group className={classes.social}>
            <ConnectButton />
          </Group>
        </Container>
      </Header>
      <Drawer
        opened={opened}
        onClose={() => toggleOpened(false)}
        title="Infamous Menu"
        padding="xl"
        size="lg"
      >
        <Navbar height={600} p="xs" width={{ base: 300 }}>
          <Navbar.Section>{/* Header with logo */}</Navbar.Section>
          <Navbar.Section grow mt="md">
            {/* Links sections */}
            <Stack spacing={8}>{items}</Stack>
          </Navbar.Section>
          <Navbar.Section>{/* Footer with user */}</Navbar.Section>
        </Navbar>
      </Drawer>
    </>
  );
}
