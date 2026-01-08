import { test } from "../../../base/Fixtures";

test.describe("Inventoty tests", () => {
  // TestId: INV-001
  test("Add new item test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.addNewItemAndVerify("Apple", "1700", "9");
  });

  // TestId: INV-002
  test("Fail when item name is empty", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.addNewItemWithoutItemName("", "", "");
  });
  // TestId: INV-003
  test("Verify item is not duplicated", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyItemIsDuplicated("Samung Galaxy S21");
  });
  // TestId: INV-004
  test("Verify stock input accepts only non decimal values", async ({
    homePage,
  }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyStockInputNonDecimalValues(10.6);
  });
  // TestId: INV-005
  test("Verify stock input does not accept negative values", async ({
    homePage,
  }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyStockInputNonNegativeValues(-5);
  });

  // TestId: INV-006
  test("Verify price input does not accept negative values", async ({
    homePage,
  }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyPriceInputNonNegativeValues(-1500);
  });

  // TestId: INV-007
  test("Verify stock input does not accept zero", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyStockInputNonNegativeValues(0);
  });

  // TestId: INV-008
  test("Verify price input does not accept zero", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyPriceInputNonNegativeValues(0);
  });
  // TestId: INV-009
  test("Verify item name cannot be more than 20 characters", async ({
    homePage,
  }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyItemNameMaxLength(
      "This is a very long item name that exceeds twenty characters"
    );
  });
  // TestId: INV-010
  test("Verify item name cannot be special characters", async ({
    homePage,
  }) => {
    await homePage.verifyElementVisibility();
    const specialCharName = "Item@123!";
    await homePage.verifyItemNameNoSpecialCharacters(specialCharName);
  });
});
