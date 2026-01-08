import { test } from "../../../base/Fixtures";

test.describe("Invoices tests", () => {
  // TestId: INV-001
  test("Add new invoice test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyUserCanCreateInvoice(
      "John Doe",
      "Laptop ($1200)",
      "2"
    );
  });

  // TestId: INV-002
  test("Customer name max length test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    const longCustomerName = "ThisIsAVeryLongCustomerNameExceedingTheLimit";
    await homePage.verifyCustomerNameMaxLength(longCustomerName);
  });

  // TestId: INV-003
  test("Customer name special characters test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    const specialCharName = "John@Doe!";
    await homePage.verifyCustomerNameNoSpecialCharacters(specialCharName);
  });
  // TestId: INV-004
  test("Customer name not empty test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    const emptyName = "";
    await homePage.verifyCustomerNameNotEmpty(emptyName);
  });

  // TestId: INV-005
  test("Customer name numeric values test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    const numericName = "John123";
    await homePage.verifyCustomerNameNoNumericValues(numericName);
  });
  // TestId: INV-006
  test("Qty cannot be decimal number test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyQuantityInputNonDecimalValues(5.5);
  });
  // TestId: INV-007
  test("Qty cannot be zero test", async ({ homePage }) => {
    await homePage.verifyElementVisibility();
    await homePage.verifyQuantityInputNonZero(0);
  });
});
