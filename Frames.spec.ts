import { test, expect } from '@playwright/test';

test('Frame and Nested Frame Interaction', async ({ page }) => {
  // 1️⃣ Navigate to main page
  await page.goto("https://leafground.com/frame.xhtml");  // replace with your URL

  // 2️⃣ Print all frames on the page
  const frames = page.frames();
  console.log("Total frames:", frames.length);
  for (const frame of frames) {
    console.log('Frame name:', frame.name(), ' | URL:', frame.url());
  }

  // -------------------------------
  // 3️⃣ Interact with Click Me Outside  frame
  // -------------------------------
  const frame = page.frame({ url: 'https://leafground.com/default.xhtml' }); // adjust URL if needed
  if (!frame) {
    throw new Error("Frame not found!");
  }

  await frame.locator('#Click').click();
  await expect(
    frame.locator('//button[contains(text(),"Hurray! You Clicked Me.")]')
  ).toContainText("Hurray! You Clicked Me.");

  // -------------------------------
  // 4️⃣ Interact with frame2
  // -------------------------------
  const frame2 = page.frame({ name: 'frame2' });
  if (!frame2) {
    throw new Error("frame2 not found on the page");
  }

  await frame2.locator('#Click').click();
  await expect(
    frame2.locator('//button[contains(text(),"Hurray! You Clicked Me.")]')
  ).toContainText("Hurray! You Clicked Me.");

  // Optional: wait to observe actions
  await page.waitForTimeout(3000);
});
