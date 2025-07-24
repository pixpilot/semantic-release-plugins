import fs from 'fs';
import path from 'path';

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { verifyConditions } from '../src/index';

describe('verifyConditions', () => {
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, 'package.json');
  const configPath = path.join(cwd, 'release.config.js');
  let originalPkg: string | null = null;
  let originalConfig: string | null = null;

  const logger = { log: vi.fn() };
  const context = { logger };

  beforeEach(() => {
    if (fs.existsSync(pkgPath)) {
      originalPkg = fs.readFileSync(pkgPath, 'utf8');
    } else {
      originalPkg = null;
    }
    if (fs.existsSync(configPath)) {
      originalConfig = fs.readFileSync(configPath, 'utf8');
    } else {
      originalConfig = null;
    }
    fs.writeFileSync(pkgPath, JSON.stringify({ name: 'test', version: '1.0.0' }));
    fs.writeFileSync(configPath, 'module.exports = {};');
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (originalPkg !== null) {
      fs.writeFileSync(pkgPath, originalPkg);
    } else if (fs.existsSync(pkgPath)) {
      fs.unlinkSync(pkgPath);
    }
    if (originalConfig !== null) {
      fs.writeFileSync(configPath, originalConfig);
    } else if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
    }
  });

  it('should log success if config exists and package is not private', () => {
    verifyConditions({}, context);
    expect(logger.log).toHaveBeenCalledWith('Release config file found.');
  });

  it('should skip if package is private', () => {
    fs.writeFileSync(
      pkgPath,
      JSON.stringify({ name: 'test', version: '1.0.0', private: true }),
    );
    verifyConditions({}, context);
    expect(logger.log).toHaveBeenCalledWith('Package is private, skipping config check.');
  });

  it('should throw if no config file exists', () => {
    fs.unlinkSync(configPath);
    expect(() => verifyConditions({}, context)).toThrow(
      'No release config file found in package: ' + cwd,
    );
  });

  it('should throw if no package.json exists', () => {
    fs.unlinkSync(pkgPath);
    expect(() => verifyConditions({}, context)).toThrow(
      'package.json not found in package: ' + cwd,
    );
  });
});
