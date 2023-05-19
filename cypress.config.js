const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default
async function setupNodeEvents(on, config) {
  on('file:preprocessor', cucumber())
  // implement node event listeners here
  screenshotOnRunFailure=true;
  require('cypress-mochawesome-reporter/plugin')(on);  //FOR HTML REPORTS
  return config;
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',     //FOR GENERATING HTML REPORT
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/UAT/features/*.{js,feature}',
    baseUrl:"https://www.lifestylestores.com/in/en",
    env:{
      OrangeHRM:"https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
      RahulShettyAutomationPractice:"https://rahulshettyacademy.com/"
    }
  },
  chromeWebSecurity: false
  
});
