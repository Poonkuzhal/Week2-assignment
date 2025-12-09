import { test, expect } from '@playwright/test';

test('Handle JS Alert', async ({ page }) => {

  await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm');

  // 1️⃣ Listen for the alert
  page.on('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message());
// Validate the alert text
  expect(dialog.message()).toBe("Press a button!");
  
    // Expected alert text here is: "Press a button!"
    await dialog.accept();   // Accept the alert
  });

  // 2️⃣ Switch to the frame that contains the button
  const frame2 = page.frame({ name: 'iframeResult' });

  if (!frame2) {
    throw new Error("iframeResult frame not found");
  }

  // Click the Try it button inside the frame
  await frame2.locator('//button[contains(text(),"Try it")]').click();

  // 3️⃣ Verify the result text inside the frame
  await expect(
    frame2.locator('//p[contains(text(),"You pressed OK!")]')
  ).toHaveText("You pressed OK!");

 
});
