import { Text, Box } from "@mantine/core";
import React from "react";
import { ITraitUpdate } from "../../models/ITraitUpdate";
import { ITrait } from "../../models/ITrait";

interface TraitItemProps {
  trait: ITraitUpdate | ITrait;
}

export function TraitItem({ trait }: TraitItemProps) {
  return (
    <Box>
      <Text size="xs" color="dimmed">
        {trait.trait_type}
      </Text>
      <Text weight={500} size="sm">
        {trait.value}
      </Text>
    </Box>
  );
}
