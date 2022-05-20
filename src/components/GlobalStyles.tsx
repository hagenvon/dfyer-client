import { Global } from "@mantine/core";

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },

        body: {
          margin: 0,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[1],
        },
      })}
    />
  );
}
