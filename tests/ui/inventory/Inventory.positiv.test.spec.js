import { test } from "../../../base/Fixtures";

test.describe("Inventoty tests Happy path", () => {
  test("Add new item tes", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.addNewItemAndVerify("Uruk", "1700", "9");
  });
});
