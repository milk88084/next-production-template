export function Footer() {
  return (
    <footer className="border-border/40 border-t py-6">
      <div className="container mx-auto flex max-w-screen-xl flex-col items-center gap-2 px-4 md:flex-row md:justify-between">
        <p className="text-muted-foreground text-sm">
          Built with Next.js, Tailwind CSS &amp; shadcn/ui.
        </p>
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} next-production-template. MIT License.
        </p>
      </div>
    </footer>
  );
}
