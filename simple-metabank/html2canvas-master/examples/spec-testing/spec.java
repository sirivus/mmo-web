import com.microsoft.playwright.*;
import com.microsoft.playwright.options.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;
import java.util.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
        .setHeadless(false));
      BrowserContext context = browser.newContext();

      // Open new page
      Page page = context.newPage();

      // Go to https://app.meliopayments.com/meliome/pay/metaverse
      page.navigate("https://app.meliopayments.com/meliome/pay/metaverse");

      // Fill [data-testid="input-totalAmount"]
      page.locator("[data-testid=\"input-totalAmount\"]").fill("1a");

      // Click [data-testid="input-invoiceNumber"]
      page.locator("[data-testid=\"input-invoiceNumber\"]").click();

      // Fill [data-testid="input-invoiceNumber"]
      page.locator("[data-testid=\"input-invoiceNumber\"]").fill("1");

      // Click text=Upload an invoice file
      page.locator("text=Upload an invoice file").click();

      // Click [data-testid="button-guests\.register\.buttonText"]
      page.locator("[data-testid=\"button-guests\\.register\\.buttonText\"]").click();
      // assertThat(page).hasURL("https://app.meliopayments.com/meliome/pay/metaverse/signUp");
    }
  }
}