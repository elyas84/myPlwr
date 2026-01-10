import { test } from "../../../base/Fixtures";

test.describe("Invoices tests", () => {
  // TestId: INV-001
  test("Add new invoice", { tag: ["@smoke"] }, async ({ homePage }) => {
    await homePage.verifyUserCanCreateInvoice("John Doe", "Laptop ($1200)", 2);
  });

  // TestId: INV-002
  test("Customer name max length", async ({ homePage }) => {
    const longCustomerName = "ThisIsAVeryLongCustomerNameExceedingTheLimit";
    await homePage.verifyCustomerNameMaxLength(
      longCustomerName,
      "Laptop ($1200)",
      2
    );
  });

  // TestId: INV-003
  test("Customer name special characters", async ({ homePage }) => {
    const specialCharName = "John@Doe!";
    await homePage.verifyCustomerNameNoSpecialCharacters(
      specialCharName,
      "Laptop ($1200)",
      2
    );
  });
  // TestId: INV-004
  test("Customer name not empty", async ({ homePage }) => {
    const emptyName = "";
    await homePage.verifyCustomerNameNotEmpty(emptyName, "Laptop ($1200)", 2);
  });

  // TestId: INV-005
  test("Customer name numeric values", async ({ homePage }) => {
    const numericName = "John123";
    await homePage.verifyCustomerNameNoNumericValues(
      numericName,
      "Laptop ($1200)",
      2
    );
  });
  // TestId: INV-006
  test("Qty cannot be decimal number", async ({ homePage }) => {
    await homePage.verifyQuantityInputNonDecimalValues(
      "John Doe",
      "Laptop ($1200)",
      5.5
    );
  });
  // TestId: INV-007
  test("Qty cannot be zero", async ({ homePage }) => {
    await homePage.verifyQuantityInputNotZero("John Doe", "Laptop ($1200)", 0);
  });

  // TestId: INV-008
  test("Quantity shuld be updated test after invoice creation", async ({
    homePage,
  }) => {});
});
