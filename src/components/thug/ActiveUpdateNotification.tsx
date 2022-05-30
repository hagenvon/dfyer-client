import { Button, Card, createStyles, Group, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUpdateHistoryPerToken } from "../../redux/updateHistoryState";
import React, { useEffect } from "react";
import { TraitItem } from "./TraitItem";
import { InlineProgress } from "../stepper/InlineProgress";
import { selectRecentUpdatesPerToken } from "../../redux/updateHistorySelectors";
import { Preview } from "../preview/Preview";
import { SectionHeader } from "./SectionHeader";

const useStyles = createStyles((theme) => ({
  item: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    paddingLeft: 6,
    paddingRight: theme.spacing.md,
    paddingBottom: 6,
    paddingTop: 6,
  },
}));

export function ActiveUpdateNotification({ token }: { token: string }) {
  // const { publicKey } = useWallet();
  const { classes } = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const updateHistory = useSelector((state: RootState) =>
    selectRecentUpdatesPerToken(state, token)
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchUpdateHistoryPerToken(token));
    }
  }, [token]);

  if (!updateHistory.length) {
    return <></>;
  }

  const handleClick = (tx: string) => () => {
    openInNewTab("https://solscan.io/tx/" + tx);
  };

  const items = updateHistory.map((it) => {
    return (
      <Card.Section key={it.signature} className={classes.item}>
        <Group align={"center"} position={"apart"}>
          <div style={{ width: "48px", height: "48px" }}>
            <Preview token={token} traits={[it.traitUpdates]} size={96} />
          </div>

          <TraitItem trait={it.traitUpdates} />

          <Text size="xs" color="dimmed">
            {new Date(it.updatedAt).toLocaleString()}
          </Text>

          <InlineProgress updateHistoryItem={it} />
          <Button
            size={"xs"}
            variant={"subtle"}
            color={"gray"}
            onClick={handleClick(it.signature)}
          >
            View on solscan.io
          </Button>
        </Group>
      </Card.Section>
    );
  });

  return (
    <Card shadow={"sm"}>
      <Card.Section>
        <SectionHeader title={"Recent Updates"} />
      </Card.Section>
      {items}
    </Card>
  );
}

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
