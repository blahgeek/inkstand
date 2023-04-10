const puppeteer = require('puppeteer');
const process = require('node:process');

// 0: node, 1: script
const url = process.argv[2];
const output = process.argv[3];

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        userDataDir: './user_data',
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 536,
        height: 724,
        deviceScaleFactor: 2,
    });
    await page.goto(url);
    try {
        await page.waitForNetworkIdle({
            idleTime: 1000,
            timeout: 30000,
        });
    } catch (e) {
        console.error(e);
    }

    await page.screenshot({path: output});
    await browser.close();
})();
