# semantic-release

> A modern TypeScript monorepo managed with pnpm and TurboRepo.

## 🚀 Getting Started

### Development

Build all packages:

```sh
pnpm build
```

Run tests:

```sh
pnpm test
```

Lint and format:

```sh
pnpm lint
pnpm format
```

### Create a New Package

Generate a new package in the monorepo:

```sh
pnpm run turbo:gen:init
```

## 📦 Packages

### [semantic-release-require-config](./packages/semantic-release-require-config/README.md)

A utility for semantic-release workflows that ensures a release config file is present in your package before running semantic-release. This is especially useful in monorepos or strict release environments, helping prevent accidental releases without explicit configuration.


## 🚢 Releases

This project uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

## 📄 License

[MIT](LICENSE)
