import { Builder } from 'selenium-webdriver';
import { describe, it, before, after } from 'mocha';

describe('Open Browser Test', function() {
  this.timeout(20000);
  let options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--disable-gpu');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-extensions');
  options.addArguments('--window-size=1920,1080');

  let driver

  before(async function() {
    driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('should open Chrome browser and load localhost:3000', async function() {

    await driver.get('http://localhost:3000');
  });
});
