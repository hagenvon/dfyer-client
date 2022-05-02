import React from "react";
import {
  useMantineColorScheme,
  SegmentedControl,
  Group,
  Center,
  Box,
  ColorScheme,
} from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center">
      <SegmentedControl
        value={colorScheme}
        onChange={(value) => toggleColorScheme(value as ColorScheme)}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <Sun size={16} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <Moon size={16} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}
