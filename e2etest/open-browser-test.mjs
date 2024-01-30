import { Builder } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome.js';
import { describe, it, before, after } from 'mocha';

describe('Open Browser Test', function() {
  this.timeout(20000);
  let driver;

  before(async function() {
    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should open Chrome browser and load localhost:3000', async function() {
    await driver.get('http://localhost:3000');
  });
});
