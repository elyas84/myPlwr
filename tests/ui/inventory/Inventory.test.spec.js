import { test } from "../../../base/Fixtures";

test.describe("Inventoty tests", () => {
  // TestId: INV-001
  test("Add new item test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.addNewItemAndVerify("Apple", "1700", "9");
  });

  // TestId: INV-002
  test("Fail when Name is empty", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.addNewItemWithoutItemName("", "", "");
  });
});
