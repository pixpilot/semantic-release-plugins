# semantic-release-require-config

## Overview

`semantic-release-require-config` is a utility for semantic-release workflows that ensures a release config file is present in your package before running semantic-release. This is especially useful in monorepos or strict release environments, helping prevent accidental releases without explicit configuration.

> **Note:** This package is not a standalone semantic-release plugin. It is designed to be extended or composed in your own custom plugins or release scripts.

## Installation

Add as a development dependency using pnpm:

```sh
npm add -D semantic-release-require-config
```

## Usage

You can use `semantic-release-require-config` by extending it in your semantic-release configuration file or via the CLI:

**In your config file (e.g., `.releaserc` or `release.config.js`):**

```json
{
  "extends": "semantic-release-require-config"
}
```

**Or with the CLI:**

```sh
semantic-release -e semantic-release-require-config
```

> **Note:** This library **cannot** be applied via the `plugins` option. The following will **not** work:
>
> ```json
> {
>   "plugins": [
>     "semantic-release-require-config" // This WON'T work
>   ]
> }
> ```

This will ensure a release config file is present before running semantic-release, helping prevent accidental releases without explicit configuration.

## How it works

- Checks that `package.json` exists and is not marked as `private`.
- Ensures a release config file (e.g., `release.config.js`, `.releaserc`, etc.) is present in the current working directory.
- Throws an error if no config file is found, preventing accidental releases.
- Logs a message if the package is private and skips the config check.

## License

[MIT](../../LICENSE)
