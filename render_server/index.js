const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use(express.json());

app.post('/screenshot', async (req, res) => {
    const apiKey = req.query.apiKey;
    if (process.env.API_KEY && apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Invalid API key' });
    }

    const {
        url,
        userAgent,
        viewport = {},
        gotoOptions = {},
        screenshotOptions = {},
        waitForNetworkIdleOptions = {},
    } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    try {
        const page = await browser.newPage();
        if (userAgent) {
            await page.setUserAgent(userAgent);
        }
        await page.setViewport(viewport);
        await page.goto(url, gotoOptions);
        if (Object.keys(waitForNetworkIdleOptions).length !== 0) {
            await page.waitForNetworkIdle(waitForNetworkIdleOptions);
        }

        const screenshot = await page.screenshot(screenshotOptions);
        const image_type = screenshotOptions?.type ?? 'png';
        res.set('Content-Type', `image/${image_type}`);
        res.send(screenshot);
    } catch (error) {
        console.error('Screenshot error:', error);
        res.status(500).json({ error: error.message });
    } finally {
        await browser.close();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Screenshot service running on port ${PORT}`);
});
