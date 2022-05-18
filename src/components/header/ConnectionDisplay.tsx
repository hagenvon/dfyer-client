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

        <ConnectButton />
      </Group>
    </Container>
  );
}
