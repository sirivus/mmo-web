/*
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.JavascriptExecutor;
public class JavaScrptVal{
public static void main(String[] args) {
System.setProperty("webdriver.gecko.driver",
"C:\\Users\\ghs6kor\\Desktop\\Java\\geckodriver.exe");
WebDriver driver = new FirefoxDriver();
//implicit wait
driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
//URL launch
driver.get("https://www.google.com/");
WebElement l = driver.findElement(By.name("q"));
//JavaScript Executor to click element
JavascriptExecutor j = (JavascriptExecutor) driver;
j.executeScript("arguments[0].click();", l);
//JavaScript Executor to enter text j.executeScript("document.getElementsByName('q')[0].value= 'Java'");
String s = l.getAttribute("value");
System.out.println("Value entered is: " + p);
driver.close();

}
}
*/