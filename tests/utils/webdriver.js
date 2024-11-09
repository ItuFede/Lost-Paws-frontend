const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const getDriver = () => {
  const options = new chrome.Options();
  options.addArguments("--headless");
  options.addArguments("--disable-gpu");

  return new Builder().forBrowser("chrome").setChromeOptions(options).build();
  //return new Builder().forBrowser("chrome").build();
};

module.exports = { getDriver };
