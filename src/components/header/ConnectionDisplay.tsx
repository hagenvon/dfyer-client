import { Balance } from "../Balance";
import { Container, Group } from "@mantine/core";
import React from "react";
import { ConnectButton } from "../connect-button/ConnectButton";
import { ClaimAllButton } from "./ClaimAllButton";

export function ConnectionDisplay() {
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
