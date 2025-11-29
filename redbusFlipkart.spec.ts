import { chromium, webkit, test } from "@playwright/test";

test("Launch RedBus and Flipkart in different browsers", async () => {

    // Launch Edge (Chromium) and open RedBus
    const edgeBrowser = await chromium.launch({ headless: false, channel: "msedge" });
    const edgeContext = await edgeBrowser.newContext();
    const redBusPage = await edgeContext.newPage();

    await redBusPage.goto("https://www.redbus.in/");

    console.log("RedBus URL:", await redBusPage.url());
    console.log("RedBus Page Title:", await redBusPage.title());

    // Launch WebKit and open Flipkart
    const webkitBrowser = await webkit.launch({ headless: false });
    const webkitContext = await webkitBrowser.newContext();
    const flipkartPage = await webkitContext.newPage();

    await flipkartPage.goto("https://www.flipkart.com/");

    console.log("Flipkart URL:", await flipkartPage.url());
    console.log("Flipkart Page Title:", await flipkartPage.title());

    // Optional: close browsers
    await edgeBrowser.close();
    await webkitBrowser.close();
});
