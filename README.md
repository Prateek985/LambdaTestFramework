# Playwright Automation Framework

## Overview

This project is a web automation testing framework built using Playwright and TypeScript.

The purpose of this project is to automate web application test scenarios, validate application functionality, and practice end-to-end testing using modern automation tools.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- npm
- Visual Studio Code
- Git and GitHub Actions

## Features

- Automated web application testing
- Cross-browser testing
- Automated test execution
- Assertions and validations
- HTML and Allure test reports
- Test execution through the command line

## Project Structure

```text
LambdaTestFrameWork/
├── tests/
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following tools before running the project:

- Node.js
- npm
- Visual Studio Code
- Git
- playwright test runner

## Current Features

- Playwright+TypeScript
- Node.js
- npm
- Page Object Model (POM)
- playwright test runner
- fixtures


## Test Application
- The framework currently uses LambdaTest for UI automation testing.

## Test Scenario
Valid Login

Test Data

Username: standard_user
Password: secret_sauce

Expected Result

User should be successfully logged in and redirected to the Home page.

How to Run

1. Clone the repository.
2. Open the project in Visual studio code.
3. Make sure Node.js and npm and playwright should be configured.
4. Run the playwright test runner to run the LoginTest.spec.ts .

## Project Status

🚧 This framework is actively being developed

Planned additions include:

. Inventory Page Object
. Explicit waits
. Negative test scenarios
. Additional test cases
. Reporting
. Cross-browser execution
. CI/CD integration

## Configuration

Browser and application URL are configured in:

browser=chrome url= https://ecommerce-playground.lambdatest.io/

The browser can be changed without modifying the test code

## Current Test
Valid Login

Open application ↓ Enter username ↓ Enter password ↓ Click Login ↓ Verify Home page ↓ Add Product to Cart ↓ Go To Cart Page ↓ Remove Product From Cart ↓ Close browser

## Automated Scenarios

Login
-  Valid login
-  Invalid login

Product
-  Verify products are displayed
-  Verify product names

Select a product
-  Add product to cart
-  Remove product from cart


## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

## Test Reports

Generate and open the HTML report after test execution:

```bash
npx playwright show-report
```

## Configuration

The `playwright.config.ts` file contains the Playwright test configuration, including browser settings, test directory, execution options, and reporting settings.

## Test Scenarios

The test scenarios are maintained in the `tests/` directory.

Additional test cases will be added as the automation framework develops.

## License

This project is created for learning, practice, and portfolio purposes.