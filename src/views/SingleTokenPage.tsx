import { Button, Card, Grid, Group, SimpleGrid, Text } from "@mantine/core";
import { SingleToken } from "../components/thug/SingleToken";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectOwnedTokens } from "../redux/metadataSelectors";
import { AvailableUpdatesWrapper } from "../components/thug/AvailableUpdatesWrapper";
import { TokenThumbnail } from "../components/thug/TokenThumbnail";
import { Headline } from "../components/headlines/Headline";
import { selectCompletedActiveUpdateSignatures } from "../redux/uiSelectors";
import { UpdateHistory } from "../components/thug/UpdateHistory";
import { ActiveUpdateNotification } from "../components/thug/ActiveUpdateNotification";
import { RootState } from "../redux/store";
import { selectRecentUpdatesPerToken } from "../redux/updateHistorySelectors";

export function SingleTokenPage() {
  const { token } = useParams();
  const ownedTokens = useSelector(selectOwnedTokens);

  const updateHistory = useSelector((state: RootState) =>
    selectRecentUpdatesPerToken(state, token || "")
  );

  const [showRecentUpdates, toggleRecentUpdates] = useState(true);

  const signatureOfCompletedUpdated = useSelector(
    selectCompletedActiveUpdateSignatures
  );
  const otherOwnedTokens = ownedTokens.filter((it) => it !== token);

  return (
    <>
      <Grid>
        <Grid.Col xs={12}>
          <Headline title={"details"}>
            {updateHistory.length > 0 && (
              <Button
                size="xs"
                onClick={() => toggleRecentUpdates(!showRecentUpdates)}
                variant={"outline"}
              >
                {showRecentUpdates
                  ? "Hide Recent Updates"
                  : "Show Recent Updates"}
              </Button>
            )}
          </Headline>
        </Grid.Col>
        {showRecentUpdates && (
          <Grid.Col xs={12}>
            <ActiveUpdateNotification token={token || ""} />
          </Grid.Col>
        )}
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

          {/*<UpdateHistory token={token || ""} />*/}
        </Grid.Col>
      </Grid>
    </>
  );
}
