import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Type-Safe",
    description: "Strict TypeScript with Zod validation for env vars and API I/O.",
  },
  {
    title: "Production Security",
    description: "CSP headers, rate limiting, and automated dependency audits.",
  },
  {
    title: "Full Test Suite",
    description: "Vitest for unit/integration tests, Playwright for E2E.",
  },
  {
    title: "CI/CD Pipeline",
    description: "GitHub Actions with lint, type-check, test, and automated releases.",
  },
  {
    title: "Modern UI",
    description: "Tailwind CSS v4 + shadcn/ui with dark mode support.",
  },
  {
    title: "State Management",
    description: "Zustand for lightweight, scalable client-side state.",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-16">
      <section className="flex flex-col items-center gap-6 pb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Next Production
          <br />
          <span className="text-muted-foreground">Template</span>
        </h1>
        <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
          A production-ready Next.js starter with security, testing, CI/CD, and best practices
          built-in. Clone and start shipping.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              Get Started
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </section>
    </div>
  );
}
