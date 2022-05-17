import { Box, Card, Grid, Group, SimpleGrid, Text } from "@mantine/core";
import { SingleToken } from "../components/thug/SingleToken";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { ThugDetails } from "../components/headlines/ThugDetails";
import { useSelector } from "react-redux";
import { selectOwnedTokens } from "../redux/metadataSelectors";
import { AvailableUpdatesWrapper } from "../components/thug/AvailableUpdatesWrapper";
import { TokenThumbnail } from "../components/thug/TokenThumbnail";
import { Headline } from "../components/headlines/Headline";
import { selectCompletedActiveUpdateSignatures } from "../redux/uiSelectors";

export function SingleTokenPage() {
  const { token } = useParams();
  const ownedTokens = useSelector(selectOwnedTokens);
  // temp: small hack to ensure reload after an update is complete,
  // maybe available updates to the store at a later stage
  const signatureOfCompletedUpdated = useSelector(
    selectCompletedActiveUpdateSignatures
  );
  const otherOwnedTokens = ownedTokens.filter((it) => it !== token);

  return (
    <>
      <Grid>
        <Grid.Col xs={12}>
          <Headline title={"details"} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
          <Group direction={"column"} spacing={20}>
            <SingleToken token={token || ""} />

            {otherOwnedTokens.length && (
              <Card shadow="sm">
                <Text weight={600} mb={12}>
                  Thug Gang:
                </Text>
                <SimpleGrid cols={3}>
                  {otherOwnedTokens.slice(0, 18).map((it) => {
                    return (
                      <Link to={"/thug/" + it} key={it}>
                        <TokenThumbnail token={it} />
                      </Link>
                    );
                  })}
                </SimpleGrid>
              </Card>
            )}
          </Group>
        </Grid.Col>
        <Grid.Col
          sm={6}
          md={8}
          key={token + signatureOfCompletedUpdated.join(",")}
        >
          <AvailableUpdatesWrapper token={token || ""} />
        </Grid.Col>
      </Grid>
    </>
  );
}
