using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

class Program
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            Headless = false,
        });
        var context = await browser.NewContextAsync();

        // Open new page
        var page = await context.NewPageAsync();

        // Go to https://app.meliopayments.com/meliome/pay/metaverse
        await page.GotoAsync("https://app.meliopayments.com/meliome/pay/metaverse");

        // Fill [data-testid="input-totalAmount"]
        await page.Locator("[data-testid=\"input-totalAmount\"]").FillAsync("1a");

        // Click [data-testid="input-invoiceNumber"]
        await page.Locator("[data-testid=\"input-invoiceNumber\"]").ClickAsync();

        // Fill [data-testid="input-invoiceNumber"]
        await page.Locator("[data-testid=\"input-invoiceNumber\"]").FillAsync("1");

        // Click text=Upload an invoice file
        await page.Locator("text=Upload an invoice file").ClickAsync();

        // Click [data-testid="button-guests\.register\.buttonText"]
        await page.Locator("[data-testid=\"button-guests\\.register\\.buttonText\"]").ClickAsync();
        // Assert.AreEqual("https://app.meliopayments.com/meliome/pay/metaverse/signUp", page.Url);
    }
}
