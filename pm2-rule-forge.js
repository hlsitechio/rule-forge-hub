#!/usr/bin/env node

/**
 * PM2 Wrapper for Rule Forge Hub Vite Server
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5174;

console.log(`Starting Rule Forge Hub on port ${PORT}...`);

// Run in development mode explicitly
const vite = spawn('npx', ['vite', '--port', PORT.toString(), '--mode', 'development'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development',
    PORT: PORT.toString()
  }
});

vite.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  process.exit(1);
});

vite.on('exit', (code) => {
  console.log(`Vite exited with code ${code}`);
  process.exit(code || 0);
});

// Handle signals
process.on('SIGTERM', () => {
  vite.kill('SIGTERM');
});

process.on('SIGINT', () => {
  vite.kill('SIGINT');
});
