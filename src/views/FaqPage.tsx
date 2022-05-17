import React from "react";
import { Question } from "../components/Question";
import { Answer } from "../components/Answer";
import { faqs } from "../config/_faqs";
// @ts-ignore
import faqImg from "../images/faq.gif";
import { Box, Center, Stack, Text } from "@mantine/core";
import { Headline } from "../components/headlines/Headline";

export function FaqPage() {
  return (
    <>
      <Center>
        <Stack>
          <Headline title={"faq"} />

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
