import React from "react";
// @ts-ignore
import details from "../../images/details.png";
// @ts-ignore
import attributes from "../../images/attributes.png";
// @ts-ignore
import faq from "../../images/faq.png";
// @ts-ignore
import collection from "../../images/collection.png";
// @ts-ignore
import myGang from "../../images/my-gang.png";
import { Box } from "@mantine/core";

export type Headlines =
  | "details"
  | "attributes"
  | "faq"
  | "collection"
  | "my-gang";

export function Headline({ title }: { title: Headlines }) {
  switch (title) {
    case "details":
      return <HeadlineImage imgSrc={details} />;
    case "attributes":
      return <HeadlineImage imgSrc={attributes} />;
    case "faq":
      return <HeadlineImage imgSrc={faq} />;
    case "collection":
      return <HeadlineImage imgSrc={collection} />;
    case "my-gang":
      return <HeadlineImage imgSrc={myGang} />;

    default:
      return null;
  }
}

export function HeadlineImage(props: { imgSrc: string }) {
  return (
    <Box mb={12} mt={10} style={{ alignItems: "flex-start" }}>
      <img src={props.imgSrc} height={44} alt={"headline"} />
    </Box>
  );
}
