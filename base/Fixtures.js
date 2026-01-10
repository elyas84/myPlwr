import { test as base } from "@playwright/test";
import dotenv from "dotenv";
import { HomePage } from "../pageObject/HomePage.js";
dotenv.config();
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    console.log(`======== SET-UP ========`);
    await page.goto(process.env.BASE_URL, {
      waitUntil: "domcontentloaded",
    });
    const homePage = new HomePage(page);
    await homePage.verifyElementVisibility();
    // run the tests
    await use(page);
    // taking screenshot
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        // attaching testName along with screenshot for readibility

        path: "test-output/" + testInfo.title + ".png",
        fullPage: true,
      });
    }
    // close the browser after tests are done
    await page.waitForTimeout(1000);
    await page.close();
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});
