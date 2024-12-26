## Cypress Test Automation Framework

## Overview

This repository contains an end-to-end test automation framework built using Cypress for a technical interview demonstration. The framework follows best practices and implements a Page Object Model design pattern.

## Prerequisites

- Node.js (tested on v21.1.0)
- npm (tested on v10.2.0)
- Git
- nvm* (Node Version Manager)

\* Suggested, but not necessary

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Benyon/cypress-technical-afi
cd cypress-technical-afi
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```bash (nicer colours)
.
├── cypress/  
│   ├── e2e/            # Test specifications.
│   ├── lib/            # Common files and utility classes.
│   ├── pages/          # Page or component objects.
│   └── support/        # Custom commands and Cypress specific utilities
├── .eslintrc.js        # ESLint configuration.
├── .gitignore          # List of files for Git to ignore.
├── .nvmrc              # Node Version Manager configuration.
├── cypress.config.ts   # Cypress configuration.
├── cypress.d.ts        # Project type definitions.
├── README.md           # Information about this repository. 
└── tsconfig.json       # TypeScript configuration.
```

## Important Points

- I have removed the fixtures folder to reduce project bloat, none of the test use them so it's not needed.
- Usually people would implement [faker-js](https://fakerjs.dev/) to generate test data, however this randomness can lead to a lot of flakiness in lower environments, and should be limited for a later environment like QA or Preprod testing.
- The rules chosen in the `.eslintrc.js` file have very little importance, however they are a collection of rules from over the years that I have found offer the most assistance, the actual ruleset would be chosen collectively as a team.
- There are quite a lot of JSDoc's, I would say this is overkill personally, however for a job interview stage it made sense.
- When re-running tests in Cypress on your application, the previous sessions attempts to be restored, which it fails to do, there is a workaround implemented however this would need investigating to fix.

## Running Tests

- Run tests in headless mode:
```bash
npm run cy:run
```

- Open Cypress Test Runner:
```bash
npm run cy:open
```

- Run tests in specific browser:
```bash
npm run cy:run:chrome
npm run cy:run:firefox
```
## Best Practices Implemented

- Consistent naming conventions
- Proper assertions upon completed test steps
- Proper logging to assist with debugging
- Reusable test components / page objects
- Code linting to align developers standards.
- Clear test organization

## Improvements

Due to the simplicity of the test scenario, there are some limitations to what skills can be demonstrated, but here are some possible improvements that could be made:

- Proper report outputs following the formats of: [Common Test Report Format](https://ctrf.io/) or [MochaAwesome](https://www.npmjs.com/package/mochawesome).
- Automatic communications with HTML reports using Teams or Slack WebHooks, alternatively for more complex flows, use [Microsoft PowerAutomate](https://www.microsoft.com/en-gb/power-platform/products/power-automate).
- For regularly repeated actions, such as finding elements by their `data-test` attribute, implement a custom Cypress command to improve re-usability. 
- When conditional test data is required, i.e. one set of test data per environment, then I would re-introduce the fixtures folder and create test data there, importing it when necessary.
- If the application-under-test relies on components for it's UI, then I would implement a component object model as oppose to a page object model, this simply means breaking the pages down further to avoid re-using selectors in multiple pages.
- Implement API testing for key stages to reduce the dependency on UI testing.
- Implement further browser coverage.
- Implement a tool such as [husky](https://www.npmjs.com/package/husky) to validate commits before pushing, to enforce coding standards.
- Investigate why sessions are being pulled into the tests from previous test runs, and remove `quotesPage.clickContinueIfShown();`
- Investigate how to pre-disable cookie popups to reduce possible flakiness.
- Depending what the business requirements are, possibly look into sharding these tests across our most popular devices and viewports.
- Depending on the complexity of all possible configuration options, such as environments, test suites and devices, look at implementing an environment variable dependant configuration system, where the logic for what tests run and how would be inside the cypress.config.ts instead of the package.json scripts.
- An additional library should be created to abstract all test data creation functions.