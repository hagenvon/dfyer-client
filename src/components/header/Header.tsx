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
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { BrandTwitter, BrandDiscord } from "tabler-icons-react";
import { InfamousLogo } from "../InfamousLogo";
import { useNavigate } from "react-router-dom";
import { InfamousBirdzLogo } from "../InfamousBirdzLogo";

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
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx, theme } = useStyles();
  const navigate = useNavigate();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
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
            <InfamousLogo
              fill={theme.colorScheme === "light" ? "#333" : "#fff"}
              height={32}
            />
          </Group>

          <Group spacing={0} className={classes.social} position="right" noWrap>
            <ActionIcon size="lg">
              <BrandTwitter size={24} strokeWidth={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <BrandDiscord size={24} strokeWidth={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </Header>
      <Drawer
        opened={opened}
        onClose={() => toggleOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        <Navbar height={600} p="xs" width={{ base: 300 }}>
          <Navbar.Section>{/* Header with logo */}</Navbar.Section>
          <Navbar.Section grow mt="md">
            {/* Links sections */}

            {items}
          </Navbar.Section>
          <Navbar.Section>{/* Footer with user */}</Navbar.Section>
        </Navbar>
      </Drawer>
    </>
  );
}
