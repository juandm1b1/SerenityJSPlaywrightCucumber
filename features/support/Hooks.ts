import { After } from '@cucumber/cucumber';
import { actorInTheSpotlight } from '@serenity-js/core';
import { PlaywrightPage } from '@serenity-js/playwright';
import * as fs from 'fs';

After(async function () {
    const actor = actorInTheSpotlight();

    // 1. Get the native Playwright page from the Serenity/JS actor
    const nativePage = await actor.answer(PlaywrightPage.current().nativePage());

    // 2. Close the Playwright page to ensure the video is finalized and saved
    const context = nativePage.context();
    await context.close();

    // 3. Access the video associated with the page and save it to disk
    const video = nativePage.video();

    if (video) {
        // 4. Wait for the video to be saved to disk
        const videoPath = await video.path();
        if (videoPath) {
            // 5. Attach the video to the Cucumber report
            this.attach(fs.readFileSync(videoPath), 'video/webm');
        }
    }
});