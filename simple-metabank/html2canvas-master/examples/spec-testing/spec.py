from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()

    # Open new page
    page = context.new_page()

    # Go to https://app.meliopayments.com/meliome/pay/metaverse
    page.goto("https://app.meliopayments.com/meliome/pay/metaverse")

    # Fill [data-testid="input-totalAmount"]
    page.locator("[data-testid=\"input-totalAmount\"]").fill("1a")

    # Click [data-testid="input-invoiceNumber"]
    page.locator("[data-testid=\"input-invoiceNumber\"]").click()

    # Fill [data-testid="input-invoiceNumber"]
    page.locator("[data-testid=\"input-invoiceNumber\"]").fill("1")

    # Click text=Upload an invoice file
    page.locator("text=Upload an invoice file").click()

    # Click [data-testid="button-guests\.register\.buttonText"]
    page.locator("[data-testid=\"button-guests\\.register\\.buttonText\"]").click()
    # expect(page).to_have_url("https://app.meliopayments.com/meliome/pay/metaverse/signUp")

    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
