import { Box, Card, Grid, Group, Text } from "@mantine/core";
import { SingleToken } from "../components/thug/SingleToken";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { ThugDetails } from "../components/headlines/ThugDetails";
import { useSelector } from "react-redux";
import { selectOwnedTokens } from "../redux/metadataSelectors";
import { AvailableUpdatesWrapper } from "../components/thug/AvailableUpdatesWrapper";
import { TokenThumbnail } from "../components/thug/TokenThumbnail";

export function SingleTokenPage() {
  const { token } = useParams();
  const ownedTokens = useSelector(selectOwnedTokens);
  const otherOwnedTokens = ownedTokens.filter((it) => it !== token);

  return (
    <>
      <Grid>
        <Grid.Col xs={12}>
          <Box mr={-15} mb={12} mt={10}>
            <ThugDetails fill={"#ccc"} height={28} />
          </Box>
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
          <Group direction={"column"} spacing={20}>
            <SingleToken token={token || ""} />

            {otherOwnedTokens.length && (
              <Card shadow="sm">
                <Text weight={600} mb={12}>
                  Thug Gang:
                </Text>
                <Grid>
                  {otherOwnedTokens.slice(0, 18).map((it) => {
                    return (
                      <Grid.Col sm={4} xs={3} md={4} key={it}>
                        <Link to={"/thug/" + it}>
                          <TokenThumbnail token={it} />
                        </Link>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Card>
            )}
          </Group>
        </Grid.Col>
        <Grid.Col sm={6} md={8} key={token}>
          <AvailableUpdatesWrapper token={token || ""} />
        </Grid.Col>
      </Grid>
    </>
  );
}
