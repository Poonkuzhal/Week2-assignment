import { chromium, test, expect } from "@playwright/test";

test("Edit Lead and validate fields", async ({page}) => {
    // Increase test timeout
    test.setTimeout(180000);

    
    // Go to the app
    await page.goto("http://leaftaps.com/opentaps/control/main");

    console.log("URL:", await page.url());
    console.log("Title:", await page.title());

    // Login
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginBtn = page.locator('.decorativeSubmit');

    await username.fill('demoSalesmanager');
    await password.fill('crmsfa');
    await loginBtn.click();

    // Click CRM/SFA
    const crmLink = page.locator('#label');
    await crmLink.waitFor({ state: 'visible' });
    await crmLink.click();

    // Navigate to Leads -> Find Leads
    await page.locator('//a[contains(text(),"Leads")]').click();
    await page.locator('//a[contains(text(),"Find Leads")]').click();

    // Enter First Name
    await page.locator('(//*[contains(text(),"First name:")])[3]').click();
    await page.locator('//*[contains(@name,"firstName") and contains(@class," x-form-text x-form-field ")]').fill("poon");
    // Click Find Leads button
    const findLeadsBtn = page.locator('//button[contains(text(),"Find Leads")]');
    await findLeadsBtn.click();

    // Wait for search results table
    const firstLeadLink = page.locator('(//table[@class="x-grid3-row-table"]//tr//td[1]//a)[1]');
    await firstLeadLink.waitFor({ state: 'visible', timeout: 30000 });
    await firstLeadLink.click();

    // Click Edit
    const editBtn = page.locator('//a[contains(text(),"Edit")]');
    await editBtn.scrollIntoViewIfNeeded();
    await editBtn.click({ force: true });

    // Edit fields
    const companyInput = page.locator('//*[contains(@name,"companyName") and contains(@class,"inputBox")]');
    await companyInput.fill('testleafEG');

    const revenueInput = page.locator('//*[@name="annualRevenue"]');
    await revenueInput.fill('4500');

    const deptInput = page.locator('//*[@name="departmentName"]');
    await deptInput.fill('IT');

    const descInput = page.locator('//*[@name="description"]');
    await descInput.fill('updated');

    // Click Update
    const updateBtn = page.locator('//*[@value="Update"]');
    await updateBtn.scrollIntoViewIfNeeded();
    await updateBtn.click({ force: true });

    // Validate updated fields
    await expect(page.locator('#viewLead_companyName_sp')).toContainText('testleafEG');
    await expect(page.locator('#viewLead_departmentName_sp')).toHaveText('IT');
    await expect(page.locator('#viewLead_description_sp')).toHaveText('updated');

    // Validate revenue
    const revenueText = await page.locator('//span[@id="viewLead_annualRevenue_sp"]').innerText();
    const actualRevenue = parseFloat(revenueText.replace(/[^0-9.]/g, ''));
    const expectedRevenue = 4500;

    console.log("Revenue:", actualRevenue);
    await expect(actualRevenue).toBe(expectedRevenue);

    console.log("All validations passed!");

    // Close browser
   // await browser.close();
});
