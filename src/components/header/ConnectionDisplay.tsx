import { Balance } from "../Balance";
import { ActionIcon, Container, createStyles, Group } from "@mantine/core";
import React from "react";
import { ConnectButton } from "../connect-button/ConnectButton";
import { ClaimAllButton } from "./ClaimAllButton";
import { BrandDiscord, BrandTwitter } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  social: {
    width: 320,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },
}));

export function ConnectionDisplay() {
  const { classes } = useStyles();

  return (
    <Container mb={12}>
      <Group position={"apart"}>
        <Group align={"center"}>
          <Balance />
          <ClaimAllButton />
        </Group>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon
            size="lg"
            onClick={() =>
              window.location.assign("https://twitter.com/infamousBirdz")
            }
          >
            <BrandTwitter size={24} strokeWidth={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            onClick={() =>
              window.location.assign("https://discord.gg/Kv4PTfq3ep")
            }
          >
            <BrandDiscord size={24} strokeWidth={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </Container>
  );
}
