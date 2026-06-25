import { Card } from "@heroui/react";
import type { ReactNode } from "react";

interface HomeCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * A small HeroUI Card used on the home page to present feature highlights.
 * Kept presentational so the page composes them however it likes.
 *
 * Uses the HeroUI v3 compound Card API: `Card.Header` / `Card.Content`
 * (replacing v2's `CardHeader` / `CardBody`).
 */
export default function HomeCard({ title, icon, children }: HomeCardProps): ReactNode {
  return (
    <Card className="border border-default-200 bg-content1/60 backdrop-blur">
      <Card.Header className="flex gap-3">
        {icon ? <span className="text-2xl">{icon}</span> : null}
        <h3 className="text-lg font-semibold">{title}</h3>
      </Card.Header>
      <Card.Content>
        <p className="text-default-500">{children}</p>
      </Card.Content>
    </Card>
  );
}
