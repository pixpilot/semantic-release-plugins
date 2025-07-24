import fs from 'fs';
import path from 'path';

/**
 * semantic-release plugin: verifyConditions
 * - Checks if release config file exists in cwd
 * - Checks if package.json is not private
 */
interface Logger {
  log: (msg: string) => void;
}
interface Context {
  logger: Logger;
}
export function verifyConditions(_pluginConfig: unknown, context: Context) {
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, 'package.json');
  let pkg: { private?: boolean };
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { private?: boolean };
  } catch (_e) {
    throw new Error('package.json not found in package: ' + cwd);
  }
  if (pkg.private) {
    context.logger.log('Package is private, skipping config check.');
    return;
  }
  // Check for release config files
  const configFiles = [
    'release.config.js',
    'release.config.cjs',
    '.releaserc',
    '.releaserc.json',
    '.releaserc.yaml',
    '.releaserc.yml',
    '.releaserc.js',
    '.releaserc.cjs',
  ];
  const hasConfig = configFiles.some((f) => fs.existsSync(path.join(cwd, f)));
  if (!hasConfig) {
    throw new Error('No release config file found in package: ' + cwd);
  }
  context.logger.log('Release config file found.');
}
