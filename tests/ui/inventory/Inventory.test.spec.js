import { test } from "../../../base/Fixtures";

test.describe("Inventoty tests", () => {
  // TestId: INV-001
  test("Add new item test", { tag: ["@smoke"] }, async ({ homePage }) => {
    await homePage.addNewItemAndVerify("Apple", 1700, 9);
  });

  // TestId: INV-002
  test("Fail when item name is empty", async ({ homePage }) => {
    await homePage.addNewItemWithoutItemName("", 10, 6);
  });
  // TestId: INV-003
  test("Verify item is not duplicated", async ({ homePage }) => {
    await homePage.verifyItemIsDuplicated("Samung Galaxy S21", 500, 15);
  });
  // TestId: INV-004
  test("Verify stock input accepts only non decimal values", async ({
    homePage,
  }) => {
    await homePage.verifyStockInputNonDecimalValues("TestItem", 1700, 10.6);
  });
  // TestId: INV-005
  test("Verify stock input does not accept negative values", async ({
    homePage,
  }) => {
    await homePage.verifyStockInputNonNegativeValues("TestItem", 1700, -5);
  });

  // TestId: INV-006
  test("Verify price input does not accept negative values", async ({
    homePage,
  }) => {
    await homePage.verifyPriceInputNonNegativeValues("TestItem", -1500, 10);
  });

  // TestId: INV-007
  test("Verify stock input does not accept zero", async ({ homePage }) => {
    await homePage.verifyStockInputNonNegativeValues("TestItem", 1700, 0);
  });

  // TestId: INV-008
  test("Verify price input does not accept zero", async ({ homePage }) => {
    await homePage.verifyPriceInputNonNegativeValues("TestItem", 0, 10);
  });
  // TestId: INV-009
  test("Verify item name cannot be more than 20 characters", async ({
    homePage,
  }) => {
    await homePage.verifyItemNameMaxLength(
      "This is a very long item name that exceeds twenty characters",
      10,
      3
    );
  });
  // TestId: INV-010
  test("Verify item name cannot be special characters", async ({
    homePage,
  }) => {
    const specialCharName = "Item@123!";
    await homePage.verifyItemNameNoSpecialCharacters(specialCharName, 1700, 9);
  });
});