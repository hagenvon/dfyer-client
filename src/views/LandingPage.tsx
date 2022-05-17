import React from "react";
import {
  Alert,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { InfamousBirdzLogo } from "../components/InfamousBirdzLogo";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import thugImg from "../images/823.png";
// @ts-ignore
import burnImg from "../images/burn.png";
// @ts-ignore
import customize from "../images/customize.jpg";

import { LandingCard } from "../components/card-components/LandingCard";

const useStyle = createStyles((theme) => ({
  card: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: 16,
    },
  },
}));

export function LandingPage() {
  const { theme } = useStyle();
  const navigate = useNavigate();
  return (
    <Box>
      <Center style={{ height: "200px" }}>
        <InfamousBirdzLogo
          fill={theme.colorScheme === "light" ? "#333" : "#fff"}
          height={132}
        />
      </Center>
      <SimpleGrid cols={3}>
        <LandingCard imageSrc={thugImg}>
          <strong>$BUTTER</strong> – Get $Butter for holding. Our utility token.
        </LandingCard>
        <LandingCard imageSrc={customize}>
          <strong>Customize</strong> – Customize your thug with classic and new
          attributes.
        </LandingCard>
        <LandingCard imageSrc={burnImg}>
          <strong>Burn</strong> – Transform your thug into a "Burnt Infamous
          Thug".
        </LandingCard>
      </SimpleGrid>

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
    </Box>
  );
}
