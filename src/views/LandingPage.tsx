import React from "react";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Grid,
  Group,
  Image,
  List,
  SimpleGrid,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { InfamousBirdzLogo } from "../components/InfamousBirdzLogo";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import thugImg from "../images/deko-thug.png";
import { Check } from "tabler-icons-react";

const useStyle = createStyles((theme) => ({
  card: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: 16,
    },
  },
}));

export function LandingPage() {
  const { classes, theme } = useStyle();
  const navigate = useNavigate();
  return (
    <Box>
      <Center style={{ height: "200px" }}>
        <InfamousBirdzLogo
          fill={theme.colorScheme === "light" ? "#333" : "#fff"}
          height={132}
        />
      </Center>
      <Card shadow={"md"}>
        <Card.Section>
          <Group>
            <Image src={thugImg} width={"100%"} />
            <Group
              direction={"column"}
              position={"left"}
              className={classes.card}
            >
              <List
                mt={30}
                mb={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={24} radius="xl" color={"green"}>
                    <Check size={12} strokeWidth={3} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Customize</b> – Customize your thug with classic
                  attributes.
                </List.Item>
                <List.Item>
                  <b>Upgrade</b> – Upgrade your thug with new attributes.
                </List.Item>
                <List.Item>
                  <b>Burn</b> – Transform your thug into a "Burnt Infamous
                  Thug".
                </List.Item>
                <List.Item>
                  <b>$BUTTER</b> – Get $Butter for holding. Our utility token.
                </List.Item>
              </List>

              <Group>
                <Button
                  size={"md"}
                  variant={"outline"}
                  onClick={() => navigate("/collection")}
                >
                  The Collection
                </Button>
                <Button
                  size={"md"}
                  variant={"outline"}
                  onClick={() => navigate("/gang")}
                >
                  My Thugs
                </Button>
              </Group>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </Box>
  );
}
