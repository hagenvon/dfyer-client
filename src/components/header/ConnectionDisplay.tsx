import { Balance } from "../Balance";
import { Box, Container } from "@mantine/core";
import React from "react";
import { ConnectButton } from "../connect-button/ConnectButton";

export function ConnectionDisplay() {
  return (
    <Container>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px",
        }}
      >
        <Balance />
        <ConnectButton />
      </Box>
    </Container>
  );
}
