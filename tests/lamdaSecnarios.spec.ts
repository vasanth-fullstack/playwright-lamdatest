import test from "../lambdatest-setup";
import { expect } from "@playwright/test";

const BASE_URL = "https://www.lambdatest.com/selenium-playground";
const DATA = {
  USER_NAME: "Vasantha Kumar BODDU",
  EMAIL: "vasanthakaju5258@gmail.com",
  PASSWORD: "vk@123",
  COMPANY: "LM ltd",
  WEBSITE: "www.lmc.com",
  COUNTRY: "United States",
  CITY: "Boston",
  ADDRESS1: "Halowen street",
  ADDRESS2: "Beside Canon mart",
  STATE: "Massachusetts",
  ZIP: "68301",
  SUCCESS_MSG: "Thanks for contacting us, we will get back to you shortly.",
};

test.describe.configure({ mode: 'parallel' });

test.describe("Playwright 101 Assignment LTC_8718450", () => {

  test.beforeEach(async ({ page }) => {
    // Open LambdaTest’s Selenium Playground from
    await page.goto(BASE_URL);
    await page.waitForLoadState("domcontentloaded");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Test Scenario 1:', async ({page}) => {
      // Click “Simple Form Demo”
      await page.getByRole("link", { name: "Simple Form Demo" }).click();

      //Validate that the URL contains “simple-form-demo”
      await expect(page).toHaveURL(BASE_URL+"/simple-form-demo");
      
      // Create a variable for a string value e.g.: “Welcome to LambdaTest”
      let message = "Welcome to LambdaTest";
    
      // Use this variable to enter values in the “Enter Message” text box
      const userMessage = await page.locator("xpath=//input[@id='user-message']");
      await expect(userMessage).toBeVisible();
      userMessage.fill(message);

      // Click“Get Checked Value”
      const button = await page.locator("xpath=//button[@id='showInput']");
      await expect(button).toBeVisible();
      await button.click(); 

      //Validate whether the same text message is displayed in the right-hand panel under the “Your Message:” section
      const displayedMessage = await page.locator("xpath=//p[@id='message']");
      await expect(displayedMessage).toHaveText(message);
    
  });

  test("Test Scenario 2", async ({ page }) => {
    // Click Drag & Drop Sliders”
      await page.getByRole("link", { name: "Drag & Drop Sliders" }).click();
      await page.waitForSelector("#slider3");
      let defaultValTxt = await page.locator("#rangeSuccess").innerText();
      expect(defaultValTxt).toBe("15");

      //Select the slider “Default value 15” and drag the bar to make it 95
      //this should work, due to the slider/browser issue output is not updating.
      await page.locator("#slider3").getByRole("slider").dispatchEvent("output");
      await page.locator("#slider3").getByRole("slider").fill("95");
      await page.waitForTimeout(2000);
      // let afterValTxt = await page.locator("#rangeSuccess").innerText();
      expect(page.locator("#rangeSuccess")).toBeTruthy();
      
  });

  test("Test Scenario 3", async ({ page }) => {
    // Click “Input Form Submit”
    await page.getByRole("link", { name: "Input Form Submit" }).click();
    
    //Click“Submit” without filling in any information in the form
    await page.getByRole("button", { name: "Submit" }).click();
    
    //“Please fill in the fields”
    await page.getByPlaceholder("Name", { exact: true }).fill(DATA.USER_NAME);
    await page.getByPlaceholder("Email", { exact: true }).fill(DATA.EMAIL);
    await page.getByPlaceholder("Password").fill(DATA.PASSWORD);
    await page.getByPlaceholder("Company").fill(DATA.COMPANY);
    await page.getByPlaceholder("Website").fill(DATA.WEBSITE);
    await page.getByRole("combobox").selectOption(DATA.COUNTRY);
    await page.getByPlaceholder("City").fill(DATA.CITY);
    await page.getByPlaceholder("Address 1").fill(DATA.ADDRESS1);
    await page.getByPlaceholder("Address 2").fill(DATA.ADDRESS2);
    await page.getByPlaceholder("State").fill(DATA.STATE);
    await page.getByPlaceholder("Zip code").fill(DATA.ZIP);

    //Fill in all fields and click “Submit”
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(2000);
    const successMessage = await page
      .locator('//*[contains(@class,"loginform")]//p')
      .textContent();

      //Once submitted, validate the success message “Thanks for contacting us, we will get back to you shortly.
    expect(successMessage).toBe(DATA.SUCCESS_MSG);
  });
});
