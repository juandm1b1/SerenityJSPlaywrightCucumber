import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { configure, Duration } from '@serenity-js/core';
import path from 'path';
import * as playwright from 'playwright';

import { Actors } from '../../test';

const timeouts = {
    cucumber: {
        step: Duration.ofSeconds(30),                       // how long to wait for a Cucumber step to complete
    },
    playwright: {
        defaultNavigationTimeout: Duration.ofSeconds(10),   // how long to wait for a page to load
        defaultTimeout:           Duration.ofSeconds(5),    // how long to wait for an element to show up
    },
    serenity: {
        cueTimeout:               Duration.ofSeconds(5),    // how long to wait for Serenity/JS to complete any post-test activities, like saving screenshots and reports
    }
}

let browser: playwright.Browser;

// Default Cucumber step timeout configuration. This is how long Cucumber will wait for a step to complete before timing out and failing the test.
setDefaultTimeout(timeouts.cucumber.step.inMilliseconds());

BeforeAll(async () => {
    // Launch the browser once before all the tests
    // Serenity/JS will take care of managing Playwright browser context and browser tabs.
    browser = await playwright.chromium.launch({
        // headless: process.env.HEADLESS !== 'false', // Uncomment this line to run the browser in headless mode (without a visible UI)
        headless: false, // Browser would be visible during the test execution
        slowMo: 100, // Slow down the execution by 100ms to make it easier to observe
    });

    // Configure Serenity/JS
    configure({

        // Configure Serenity/JS actors to use Playwright browser
        actors: new Actors(
            browser,
            {                
                baseURL: 'https://www.saucedemo.com/',
                recordVideo: {
                    dir: './videos', // Directory where the video files will be saved
                    size: { width: 1280, height: 720 }, // Set the desired video resolution
            },
            },
            {
                defaultNavigationTimeout: timeouts.playwright.defaultNavigationTimeout.inMilliseconds(),
                defaultTimeout: timeouts.playwright.defaultTimeout.inMilliseconds(),
            }
        ),

        // Configure Serenity/JS reporting services
        crew: [
            [ '@serenity-js/console-reporter', { theme: 'auto' } ],
            [ '@serenity-js/web:Photographer', {
                strategy: 'TakePhotosOfInteractions',    // capture screenshots of all the interactions; slower but more comprehensive
                //strategy: 'TakePhotosOfFailures',           // capture screenshots of failed interactions; much faster
            } ],
            [ '@serenity-js/core:ArtifactArchiver', {
                outputDirectory: 'allure-results', // Directory where the Allure results will be saved, it must match Allure resultsDir
            } ],
            // [ '@serenity-js/html-reporter', { specDirectory: path.resolve(__dirname, '../../features') } ],
        ],        

        cueTimeout: timeouts.serenity.cueTimeout,
    });
});

AfterAll(async () => {
    // Close the browser after all the tests are finished
    if (browser) {
        await browser.close();
    }
})
