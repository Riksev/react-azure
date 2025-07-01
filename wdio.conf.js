exports.config = {
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  region: process.env.REGION,
  services: [
    [
      "sauce",
      {
        sauceConnect: true,
        sauceConnectOpts: {
          proxyLocalhost: "allow",
        },
      },
    ],
    [
      "@saucelabs/wdio-sauce-visual-service",
      {
        project: "react-azure",
        branch: "main",
        buildName: process.env.SAUCE_BUILD_NAME,
      },
    ],
  ],
  specs: ["./test/specs/**/*.spec.js"],
  exclude: [],
  maxInstances: 1,
  before: async function (capabilities, specs) {
    if (capabilities.browserName === "chrome") {
      await browser.setWindowSize(1382, 915); //1366x768 + [16px, 147px] for the taskbar
    }
    if (capabilities.browserName === "safari") {
      await browser.setWindowSize(375, 864); //375x812 + [0px, 52px] for the taskbar
    }
    await browser.pause(2000);
  },
  capabilities: [
    {
      browserName: "chrome",
      platformName: "Windows 11",
      browserVersion: "latest",
      "sauce:options": {
        screenResolution: "1600x1200",
      },
    },
    {
      browserName: "safari",
      platformName: "macOS 13",
      browserVersion: "latest",
      "sauce:options": {
        screenResolution: "1600x1200",
      },
    },
  ],
  logLevel: "warn",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
