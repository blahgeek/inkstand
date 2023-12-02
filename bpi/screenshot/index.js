const puppeteer = require('puppeteer');
const process = require('node:process');

// 0: node, 1: script
const url = process.argv[2];
const output = process.argv[3];

(async () => {
    const browser = await puppeteer.connect({
        browserURL: 'http://127.0.0.1:9222',
    });
    // close existing pages except first one
    const pages = await browser.pages();
    for (let i = 1; i < pages.length; i++) {
        await pages[i].close();
    }
    const page = pages[0] ?? (await browser.newPage());

    await page.setViewport({
        width: 536,
        height: 724,
        deviceScaleFactor: 2,
    });
    await page.goto('about:blank');
    await page.goto(url);
    try {
        await page.waitForNetworkIdle({
            idleTime: 3000,
            timeout: 30000,
        });
    } catch (e) {
        console.error(e);
    }

    await page.screenshot({path: output});
    browser.disconnect();
})();
