import React from "react";
import {
  Alert,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { InfamousBirdzLogo } from "../components/InfamousBirdzLogo";
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore
import thugImg from "../images/823.png";
// @ts-ignore
import burnImg from "../images/burn.png";
// @ts-ignore
import customize from "../images/customize.jpg";
// @ts-ignore
import wording from "../images/itd.png";

import { LandingCard } from "../components/card-components/LandingCard";
import { useMediaQuery } from "@mantine/hooks";

const useStyle = createStyles((theme) => ({
  card: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: 16,
    },
  },
}));

export function LandingPage() {
  const { theme } = useStyle();
  const breakpointMatch = useMediaQuery(
    `(max-width: ${theme.breakpoints.sm}px)`
  );
  const navigate = useNavigate();
  return (
    <Box>
      <Center style={{ height: "200px" }}>
        <InfamousBirdzLogo
          fill={theme.colorScheme === "light" ? "#333" : "#fff"}
          height={132}
        />
      </Center>

      <Center mt={30} mb={30}>
        <Group>
          <Button size={"lg"} onClick={() => navigate("/collection")}>
            The Collection
          </Button>
          <Button size={"lg"} onClick={() => navigate("/gang")}>
            My Gang
          </Button>
        </Group>
      </Center>

      <SimpleGrid cols={breakpointMatch ? 1 : 3}>
        <Link to={"/gang"} style={{ textDecoration: "none" }}>
          <LandingCard imageSrc={thugImg}>
            <strong>$BUTTER</strong> – Get $Butter for holding. Our utility
            token.
          </LandingCard>
        </Link>
        <Link to={"/gang"} style={{ textDecoration: "none" }}>
          <LandingCard imageSrc={customize}>
            <strong>Customize</strong> – Customize your thug with classic and
            new attributes.
          </LandingCard>
        </Link>
        <Link to={"/gang"} style={{ textDecoration: "none" }}>
          <LandingCard imageSrc={burnImg}>
            <strong>Burn</strong> – Transform your thug into a "Burnt Infamous
            Thug".
          </LandingCard>
        </Link>
      </SimpleGrid>
    </Box>
  );
}
