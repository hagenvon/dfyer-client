import React from "react";
import { useSelector } from "react-redux";
import { selectCountedAttributesInTotal } from "../redux/selectors";
import { Card, Group, SimpleGrid, Text, Progress, Badge } from "@mantine/core";

export function AttributesPage() {
  const countedAttributes = useSelector(selectCountedAttributesInTotal);

  const traitTypes = Object.keys(countedAttributes);

  return (
    <div>
      {traitTypes.map((type) => {
        return (
          <div key={type}>
            <Text size={"lg"} weight={"600"} mt={20} mb={10}>
              {type}
            </Text>
            <SimpleGrid cols={5}>
              {Object.keys(countedAttributes[type]).map((value) => {
                return (
                  <Card key={value}>
                    <Text align="center">{value}</Text>
                    <Progress
                      value={(countedAttributes[type][value] / 1680) * 100}
                      mt={5}
                    />
                    <Group position="apart" mt="md">
                      <Text size="sm">{countedAttributes[type][value]}</Text>
                      <Badge size="sm">
                        {(
                          (countedAttributes[type][value] / 1680) *
                          100
                        ).toFixed(2)}
                        %
                      </Badge>
                    </Group>
                  </Card>
                );
              })}
            </SimpleGrid>
          </div>
        );
      })}
    </div>
  );
}
