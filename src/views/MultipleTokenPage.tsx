import { TokenList } from "../components/TokenList";
import React from "react";
import { Grid } from "@mantine/core";
import { Headline } from "../components/headlines/Headline";

export function MultipleTokenPage() {
  return (
    <>
      <Grid>
        <Grid.Col>
          <Headline title={"my-gang"} />
        </Grid.Col>
      </Grid>

      <TokenList />
    </>
  );
}
