import { test } from "../../../base/Fixtures";
import { DORP_DOWN_ITEM } from "../../../base/AppData";

test.describe("Invoices tests", () => {
  // TestId: INV-001
  test("Add new invoice", { tag: ["@smoke"] }, async ({ homePage }) => {
    await homePage.verifyUserCanCreateInvoice("John Doe", DORP_DOWN_ITEM, 2);
  });

  // TestId: INV-002
  test("Customer name max length", async ({ homePage }) => {
    const longCustomerName = "ThisIsAVeryLongCustomerNameExceedingTheLimit";
    await homePage.verifyCustomerNameMaxLength(
      longCustomerName,
      DORP_DOWN_ITEM,
      2
    );
  });

  // TestId: INV-003
  test("Customer name special characters", async ({ homePage }) => {
    const specialCharName = "John@Doe!";
    await homePage.verifyCustomerNameNoSpecialCharacters(
      specialCharName,
      DORP_DOWN_ITEM,
      2
    );
  });
  // TestId: INV-004
  test("Customer name not empty", async ({ homePage }) => {
    const emptyName = "";
    await homePage.verifyCustomerNameNotEmpty(emptyName, DORP_DOWN_ITEM, 2);
  });

  // TestId: INV-005
  test("Customer name numeric values", async ({ homePage }) => {
    const numericName = "John123";
    await homePage.verifyCustomerNameNoNumericValues(
      numericName,
      DORP_DOWN_ITEM,
      2
    );
  });
  // TestId: INV-006
  test("Qty cannot be decimal number", async ({ homePage }) => {
    await homePage.verifyQuantityInputNonDecimalValues(
      "John Doe",
      DORP_DOWN_ITEM,
      5.5
    );
  });
  // TestId: INV-007
  test("Qty cannot be zero", async ({ homePage }) => {
    await homePage.verifyQuantityInputNotZero("John Doe", DORP_DOWN_ITEM, 0);
  });

  // TestId: INV-008
  test("Quantity shuld be updated after invoice creation", async ({
    homePage,
  }) => {
    await homePage.verifyItemQuantityUpdates("John Doe", DORP_DOWN_ITEM, 10);
  });
});
