import { chromium, test, expect } from "@playwright/test";

test("Create Lead and validate fields", async ({page}) => {

    // Launch browser
    
    // Go to the application
    await page.goto("http://leaftaps.com/opentaps/control/main");

    console.log("URL:", await page.url());
    console.log("Page Title:", await page.title());

    // Login
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('.decorativeSubmit');

    await usernameInput.fill('demoSalesmanager');
    await passwordInput.fill('crmsfa');
    await loginButton.highlight();
    await loginButton.click();

    // Click CRM/SFA link
    const crmLink = page.locator('#label');
    await expect(crmLink).toBeVisible({ timeout: 10000 });
    await crmLink.click();

    // Navigate to Leads → Create Lead
    await page.locator('//a[contains(text(),"Leads")]').click();
    await page.locator('//a[contains(text(),"Create Lead")]').click();

    // Fill Create Lead form
    await page.locator('#createLeadForm_companyName').fill('Testleaf');
    await page.locator('#createLeadForm_firstName').fill('Poon');
    await page.locator('#createLeadForm_lastName').fill('Kuzhali');
    await page.locator('#createLeadForm_personalTitle').fill('Cash');
    await page.locator('#createLeadForm_generalProfTitle').fill('Page');
    await page.locator('#createLeadForm_annualRevenue').fill('20000');
    await page.locator('#createLeadForm_departmentName').fill('CSE');
    await page.locator('#createLeadForm_primaryPhoneNumber').fill('1234');

    // Submit the form
    await page.locator('.smallSubmit').click();

    // Wait for Lead view page
    const companyView = page.locator('#viewLead_companyName_sp');
    await expect(companyView).toBeVisible({ timeout: 10000 });

    // Validate created values using Playwright assertions
    await expect(companyView).toContainText('Testleaf');
    await expect(page.locator('#viewLead_lastName_sp')).toHaveText('Kuzhali');
    await expect(page.locator('#viewLead_statusId_sp')).toHaveText('Assigned');

    console.log("Lead created successfully with correct values.");

    // Optional: print values
    console.log("Company Name:", await companyView.innerText());
    console.log("Last Name:", await page.locator('#viewLead_lastName_sp').innerText());
    console.log("Status:", await page.locator('#viewLead_statusId_sp').innerText());

    // Print page title after creating lead
    console.log("Page title after creating Lead:", await page.title());

    // Close browser
    //await browser.close();
});
