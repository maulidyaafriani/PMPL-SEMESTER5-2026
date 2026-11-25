require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { defineConfig, devices } = require('@playwright/test');
const authFile = path.join(__dirname, '.auth', 'user.json');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  workers: 1,
  retries: 1,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'https://siakad.polinema.ac.id',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: async ({}, use) => {
          await use(
            fs.existsSync(authFile)
              ? authFile
              : { cookies: [], origins: [] }
          );
        },
      },
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.js/,
    },
  ],
});
