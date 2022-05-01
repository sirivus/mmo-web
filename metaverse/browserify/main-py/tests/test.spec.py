from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()

    # Open new page
    page = context.new_page()

    # Go to https://www.wikipedia.org/
    page.goto("https://www.wikipedia.org/")
a
    # Click input[name="search"]
    page.locator("input[name=\"search\"]").click()

    # Fill input[name="search"]
    page.locator("input[name=\"search\"]").fill("asdasd")

    # Click button:has-text("Search")
    page.locator("button:has-text(\"Search\")").click()
    # expect(page).to_have_url("https://en.wikipedia.org/wiki/Special:Search?search=asdasd&go=Go&ns0=1")

    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)

PLAYWRIGHT_BROWSERS_PATH=0 playwright install chromium
pyinstaller -F main.py

