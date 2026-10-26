# Serenity/JS + Cucumber + Playwright (TypeScript)

Automated UI testing framework using the Screenplay Pattern with Serenity/JS, Cucumber for BDD, and Playwright as the browser automation engine.

## 📋 Prerequisites

Before running the tests, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Java Runtime Environment (JRE)](https://www.oracle.com/java/technologies/downloads/) (Required to generate and view Allure reports)

## 🚀 Getting Started

#### 1. Install dependencies
Install the Node modules and the Playwright browser binaries:
```bash
npm install
npx playwright install chromium
(Note: If you are in a CI/CD environment, use npm ci instead of npm install)

2. Run tests
Execute the test suite. You can filter by tags (e.g., @swag):

bash
npx cucumber-js --tags "@swag"

3. Generate and open Allure reports
After the tests finish, generate the HTML report and open it in your browser:

bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report


📁 Project Structure
The project separates the business logic (Screenplay) from the BDD specifications (Gherkin):

.
├── features/
│   ├── practice/
│   │   └── swag_labs.feature             # Gherkin scenarios for the Swag Labs flow
│   ├── step-definitions/
│   │   ├── parameter.steps.ts            # Custom parameter definitions
│   │   └── swag-labs.steps.ts            # Step definitions mapping Given/When/Then to actions
│   └── support/
│       ├── Hooks.ts                      # Test lifecycle hooks (e.g., video attachment)
│       └── serenity.config.ts            # Serenity/JS configuration (Actors, Crew, Reporters)
├── test/
│   ├── Actors.ts                         # Actor definitions and Abilities configuration
│   ├── index.ts                          # Barrel file to export Screenplay components
│   └── practice/
│       ├── Authenticate.ts               # Login tasks
│       ├── Checkout.ts                   # Checkout flow tasks
|       ├── index.ts                      # Barrel file to export Screenplay components
│       └── Inventory.ts                  # Inventory-related tasks
│
├── .gitignore                            # Git ignore rules (reports, videos, node_modules)
├── cucumber.js                           # Cucumber execution profile configuration
├── package.json                          # Project scripts and dependencies
└── tsconfig.json                         # TypeScript compiler options


Note: Folders like allure-results/, allure-report/, reports/, and videos/ are generated automatically when tests are executed and are ignored by Git.

🏗️ Key Concepts
features/*.feature: Cucumber scenarios written in Gherkin (Given / When / Then), describing user behavior.

features/step-definitions/: Bridges the Gherkin steps to the Screenplay implementation.

test/: The core logic following the Screenplay Pattern. Instead of Page Objects, we use Actors (who do the testing) performing Tasks (high-level business goals) using Abilities (like BrowseTheWebWithPlaywright).

features/support/serenity.config.ts: The heart of the framework setup, where the browser is launched, the Cast of Actors is configured, and the reporting crew (Console, Photographer, ArtifactArchiver) is defined.