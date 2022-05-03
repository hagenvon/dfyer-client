import { TokenList } from "../components/TokenList";
import React from "react";
import {
  Box,
  Card,
  Center,
  Container,
  Grid,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import { ThugGang } from "../components/headlines/ThugGang";
import { InfamousBirdzLogo } from "../components/InfamousBirdzLogo";
import { FooterDefault } from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Box>
      <Center style={{ height: "300px" }}>
        <InfamousBirdzLogo
          fill={theme.colorScheme === "light" ? "#333" : "#fff"}
          height={132}
        />
      </Center>
      <Container>
        <SimpleGrid cols={3}>
          <Card onClick={() => navigate("/rarity")}>The Collection</Card>
          <Card onClick={() => navigate("/gang")}>Customize</Card>
          <Card onClick={() => navigate("/gang")}>Burn</Card>
        </SimpleGrid>
      </Container>
      <FooterDefault />
    </Box>
  );
}
