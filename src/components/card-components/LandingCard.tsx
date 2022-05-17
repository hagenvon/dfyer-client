import { Card, Image } from "@mantine/core";
import { ReactNode } from "react";

export interface LandingCardProps {
  imageSrc: string;
  children: ReactNode;
}

export function LandingCard({ imageSrc, children }: LandingCardProps) {
  return (
    <Card shadow={"sm"}>
      <Card.Section mb={16}>
        <Image src={imageSrc} width={"100%"} />
      </Card.Section>

      {children}
    </Card>
  );
}
