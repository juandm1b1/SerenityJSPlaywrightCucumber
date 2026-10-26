/**
 * This is a Cucumber.js profile
 * @see https://github.com/cucumber/cucumber-js/blob/main/docs/profiles.md
 *
 * @type {{default: string}}
 */
module.exports = {
    default: [
        `--require-module 'ts-node/register'`,                 // use TypeScript in-memory transpiler, ts-node
        `--format "@serenity-js/cucumber"`,                    // Serenity/JS reporter
        `--format "allure-cucumberjs/reporter"`,               // Allure reporter
        `--format-options '{"resultsDir": "allure-results"}'`, // configure Allure results directory
        `--require "./features/**/*.steps.ts"`,                // load step definition libraries
        `--require './features/**/*.config.ts'`,               // load configuration files, such as features/support/
        `--require './features/support/hooks.ts'`              // load hooks, such as before/after scenario
    ].join(' ')
};
