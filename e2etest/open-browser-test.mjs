import { Builder } from 'selenium-webdriver';
import { describe, it, before, after } from 'mocha';

describe('Open Browser Test', function() {
  this.timeout(20000);
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should open Chrome browser and load localhost:3000', async function() {

    await driver.get('http://localhost:3000');
  });
});
