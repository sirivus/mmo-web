import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://www.google.com/
  await page.goto('https://www.google.com/');

  // Click [aria-label="Search"]
  await page.locator('[aria-label="Search"]').click();

  // Fill [aria-label="Search"]
  await page.locator('[aria-label="Search"]').fill('hi');

  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.google.com/search?q=hi&source=hp&ei=pkhqYtbdCYG2tAahzJDgDA&iflsig=AJiK0e8AAAAAYmpWtk55M31J7X2HoUSW5HoGTLq4ODwY&ved=0ahUKEwjWyKWYpLb3AhUBG80KHSEmBMwQ4dUDCAk&uact=5&oq=hi&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAELEDEIMBMggIABCABBCxAzILCAAQgAQQsQMQgwEyCAguEIAEELEDMggILhCABBCxAzILCAAQgAQQsQMQgwEyEQguEIAEELEDEIMBEMcBENEDMgUIABCABDIICC4QgAQQsQMyCAgAEIAEELEDOg4IABCPARDqAhCMAxDlAjoRCC4QgAQQsQMQgwEQxwEQowI6DgguEIAEELEDEMcBEKMCOgsILhCABBCxAxCDAToLCC4QsQMQgwEQ1AJQnQhYzwtg6g1oAXAAeACAAVCIAZwBkgEBMpgBAKABAbABCg&sclient=gws-wiz' }*/),
    page.locator('[aria-label="Search"]').press('Enter')
  ]);

});