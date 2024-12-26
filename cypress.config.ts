import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.animalfriends.co.uk/',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    watchForFileChanges: false,
    defaultBrowser: 'chrome'
  }
});
