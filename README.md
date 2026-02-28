# Next Production Template

A production-ready Next.js starter template with security, testing, CI/CD, and best practices built-in.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: Zustand
- **Validation**: Zod (env vars + API I/O)
- **Testing**: Vitest (unit/integration) + Playwright (E2E)
- **CI/CD**: GitHub Actions + Changesets
- **Code Quality**: ESLint, Prettier, Husky, lint-staged, commitlint

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/next-production-template.git
cd next-production-template

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

| Command                 | Description                       |
| ----------------------- | --------------------------------- |
| `npm run dev`           | Start dev server with Turbopack   |
| `npm run build`         | Create production build           |
| `npm run start`         | Start production server           |
| `npm run lint`          | Run ESLint                        |
| `npm run lint:fix`      | Run ESLint with auto-fix          |
| `npm run format`        | Format code with Prettier         |
| `npm run format:check`  | Check code formatting             |
| `npm run type-check`    | Run TypeScript type checking      |
| `npm run test`          | Run unit/integration tests        |
| `npm run test:watch`    | Run tests in watch mode           |
| `npm run test:coverage` | Run tests with coverage report    |
| `npm run test:e2e`      | Run Playwright E2E tests          |
| `npm run changeset`     | Create a changeset for versioning |

## Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── api/             # API routes
│   ├── layout.tsx       # Root layout with fonts and metadata
│   ├── page.tsx         # Home page
│   ├── error.tsx        # Global error boundary
│   └── not-found.tsx    # 404 page
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components (header, footer)
│   └── theme-provider.tsx
├── hooks/               # Custom React hooks
├── lib/
│   ├── env.ts           # Zod environment variable validation
│   ├── utils.ts         # Utility functions (cn, etc.)
│   └── api-client.ts    # Type-safe API client with Zod
├── stores/              # Zustand state stores
└── middleware.ts         # CSP headers + rate limiting

tests/
├── unit/                # Unit tests (Vitest)
├── integration/         # Integration tests (Vitest)
└── e2e/                 # End-to-end tests (Playwright)

.github/
├── workflows/
│   ├── ci.yml           # Lint, type-check, test pipeline
│   └── release.yml      # Automated versioning with Changesets
└── dependabot.yml       # Automated dependency updates
```

## CI/CD Pipeline

### Continuous Integration (`ci.yml`)

Triggered on every pull request and push to `main`:

1. **Lint & Format** - ESLint + Prettier check
2. **Type Check** - `tsc --noEmit` for type safety
3. **Unit & Integration Tests** - Vitest with coverage report
4. **E2E Tests** - Playwright (Chromium) with report artifact
5. **Security Audit** - `npm audit` for vulnerability scanning

All jobs run in parallel for fast feedback. PRs cannot be merged until all checks pass (configure branch protection rules in GitHub settings).

### Automated Releases (`release.yml`)

Triggered on push to `main`:

1. Changesets detects version bumps
2. Creates a "Version Packages" PR automatically
3. On merge, bumps version in `package.json` and updates `CHANGELOG.md`

#### Creating a Changeset

Before merging a PR with user-facing changes:

```bash
npm run changeset
# Follow prompts to select semver bump type and describe changes
```

### Dependency Management (Dependabot)

- Checks npm dependencies weekly (Mondays)
- Groups minor and patch updates into single PRs
- Also monitors GitHub Actions versions

## Security

### Middleware Security Headers

The middleware (`src/middleware.ts`) sets the following headers on all responses:

- **Content-Security-Policy** - Restricts resource loading sources
- **X-Frame-Options: DENY** - Prevents clickjacking
- **X-Content-Type-Options: nosniff** - Prevents MIME sniffing
- **Referrer-Policy** - Controls referrer information
- **Permissions-Policy** - Disables camera, microphone, geolocation

### API Rate Limiting

API routes (`/api/*`) are protected with in-memory rate limiting:

- Default: 100 requests per 60-second window per IP
- Configurable via `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS` env vars
- Returns `429 Too Many Requests` when exceeded

> **Note**: In production with multiple instances, replace in-memory rate limiting with Redis or a similar distributed store.

### Additional Security

- `poweredByHeader: false` in Next.js config
- HSTS header via `next.config.ts`
- Automated `npm audit` in CI pipeline
- Dependabot keeps dependencies updated

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable               | Description                        | Default                 |
| ---------------------- | ---------------------------------- | ----------------------- |
| `NEXT_PUBLIC_APP_URL`  | Public URL of the app              | `http://localhost:3000` |
| `API_SECRET`           | Secret key for API protection      | -                       |
| `RATE_LIMIT_MAX`       | Max requests per rate limit window | `100`                   |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms            | `60000`                 |

All environment variables are validated at startup using Zod schemas (`src/lib/env.ts`).

## Performance

- **Turbopack** enabled for development
- **Font optimization** via `next/font` (Geist Sans + Mono)
- **Image optimization** with AVIF and WebP formats
- **Edge Runtime ready** middleware
- **React Strict Mode** enabled
- **TypeScript strict mode** enabled

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run changeset` if the change is user-facing
4. Open a PR - CI will run automatically
5. Get review and merge

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve hydration mismatch
docs: update README with new API docs
```

## License

MIT
