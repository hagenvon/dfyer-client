import React, { useEffect } from "react";
import { Question } from "../components/Question";
import { Answer } from "../components/Answer";
import {
  faqs,
  faqsStake,
  faqsUpdates,
  faqsIssues,
  faqsBurn,
} from "../config/_faqs";
// @ts-ignore
import faqImg from "../images/faq.gif";
import { Box, Center, Stack, Text, Title } from "@mantine/core";
import { Headline } from "../components/headlines/Headline";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRewardConfig,
  selectIsRewardsInitialized,
  selectRewardConfig,
} from "../redux/rewardState";
import { AppDispatch } from "../redux/store";

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function FaqPage() {
  const dispatch = useDispatch<AppDispatch>();
  const isRewardsInitialized = useSelector(selectIsRewardsInitialized);
  const rewardConfig = useSelector(selectRewardConfig);

  useEffect(() => {
    if (!isRewardsInitialized) {
      dispatch(fetchRewardConfig());
    }
  }, []);

  return (
    <>
      <Center>
        <Stack>
          <Headline title={"faq"} />

          <Title order={2}>Rewards/Butter</Title>

          {faqsStake.map(({ question, answer }) => {
            return (
              <div key={question}>
                <Question value={question} />
                <Answer value={answer} />
              </div>
            );
          })}

          {rewardConfig && (
            <div>
              <Question value={"What's the reward for staking?"} />
              <Answer
                value={`You get ${rewardConfig?.reward.amount} Butter every ${
                  rewardConfig?.interval / MS_PER_DAY
                } ${
                  rewardConfig?.interval / MS_PER_DAY === 1 ? "day" : "days"
                }. You can claim your reward after a lock period of ${
                  rewardConfig.lockedPeriod / MS_PER_DAY
                } days`}
              />
            </div>
          )}

          <Title order={2} mt={20}>
            Updates/Customization
          </Title>

          {faqsUpdates.map(({ question, answer }) => {
            return (
              <div key={question}>
                <Question value={question} />
                <Answer value={answer} />
              </div>
            );
          })}

          <Title order={2} mt={20}>
            Burn
          </Title>

          {faqsBurn.map(({ question, answer }) => {
            return (
              <div key={question}>
                <Question value={question} />
                <Answer value={answer} />
              </div>
            );
          })}

          <Title order={2} mt={20}>
            Issues
          </Title>

          {faqsIssues.map(({ question, answer }) => {
            return (
              <div key={question}>
                <Question value={question} />
                <Answer value={answer} />
              </div>
            );
          })}

          <Title order={2} mt={20}>
            General
          </Title>

          {faqs.map(({ question, answer }) => {
            return (
              <div key={question}>
                <Question value={question} />
                <Answer value={answer} />
              </div>
            );
          })}
        </Stack>
      </Center>
    </>
  );
}
