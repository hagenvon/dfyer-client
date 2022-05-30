import React, { ReactNode } from "react";
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
import { Box, Group } from "@mantine/core";

export type Headlines =
  | "details"
  | "attributes"
  | "faq"
  | "collection"
  | "my-gang";

export function Headline({
  title,
  children = null,
}: {
  title: Headlines;
  children?: ReactNode;
}) {
  switch (title) {
    case "details":
      return <HeadlineImage imgSrc={details} children={children} />;
    case "attributes":
      return <HeadlineImage imgSrc={attributes} children={children} />;
    case "faq":
      return <HeadlineImage imgSrc={faq} children={children} />;
    case "collection":
      return <HeadlineImage imgSrc={collection} children={children} />;
    case "my-gang":
      return <HeadlineImage imgSrc={myGang} children={children} />;

    default:
      return null;
  }
}

export function HeadlineImage(props: { imgSrc: string; children: ReactNode }) {
  return (
    <Group mb={12} mt={10} position={"apart"}>
      <img src={props.imgSrc} height={44} alt={"headline"} />
      {props.children}
    </Group>
  );
}
