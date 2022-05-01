# main.py
from playwright.sync_api import sync_playwright
firefox.launch(headless=False, slow_mo=50)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://whatsmyuseragent.org/")
    page.screenshot(path="example.png")
    browser.close()