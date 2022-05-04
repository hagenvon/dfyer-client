import { TokenList } from "../components/TokenList";
import React from "react";
import { Box, Grid } from "@mantine/core";
import { ThugGang } from "../components/headlines/ThugGang";

export function MultipleTokenPage() {
  return (
    <>
      <Grid>
        <Grid.Col>
          <Box mb={12} mt={10} style={{ alignItems: "flex-start" }}>
            <ThugGang fill={"#ccc"} height={28} />
          </Box>
        </Grid.Col>
      </Grid>

      <TokenList />
    </>
  );
}
