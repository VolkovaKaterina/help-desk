import { Builder, WebDriver } from "selenium-webdriver";
import { describe, it, before, after } from "mocha";
import { Options } from "selenium-webdriver/chrome";

describe("Open Browser Test", function () {
  this.timeout(20000);
  let driver: WebDriver;

  before(async function () {
    const options = new Options();
    options.addArguments(
      "--headless",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--remote-debugging-pipe",
    ); // Add headless argument
    options.addArguments("window-size=1920,1080"); // Specify window size if needed

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should open Chrome browser and load localhost:3000", async function () {
    await driver.get("http://localhost:3000");
  });
});
