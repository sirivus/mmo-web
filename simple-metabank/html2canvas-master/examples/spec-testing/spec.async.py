import asyncio

from playwright.async_api import Playwright, async_playwright, expect


async def run(playwright: Playwright) -> None:
    browser = await playwright.chromium.launch(headless=False)
    context = await browser.new_context()

    # Open new page
    page = await context.new_page()

    # Go to https://app.meliopayments.com/meliome/pay/metaverse
    await page.goto("https://app.meliopayments.com/meliome/pay/metaverse")

    # Fill [data-testid="input-totalAmount"]
    await page.locator("[data-testid=\"input-totalAmount\"]").fill("1a")

    # Click [data-testid="input-invoiceNumber"]
    await page.locator("[data-testid=\"input-invoiceNumber\"]").click()

    # Fill [data-testid="input-invoiceNumber"]
    await page.locator("[data-testid=\"input-invoiceNumber\"]").fill("1")

    # Click text=Upload an invoice file
    await page.locator("text=Upload an invoice file").click()

    # Click [data-testid="button-guests\.register\.buttonText"]
    await page.locator("[data-testid=\"button-guests\\.register\\.buttonText\"]").click()
    # await expect(page).to_have_url("https://app.meliopayments.com/meliome/pay/metaverse/signUp")

    # ---------------------
    await context.close()
    await browser.close()


async def main() -> None:
    async with async_playwright() as playwright:
        await run(playwright)


asyncio.run(main())
