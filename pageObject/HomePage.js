import { expect } from "@playwright/test";

export class HomePage {
  // Define locators
  constructor(page) {
    this.page = page;
    this.tablerows = page.locator("//table//tbody/tr"); // list of row
    this.tableTitle = page.locator("//h3[text()='Add New Item']");
    this.nameInput = page.locator("//input[@id='itemName']");
    this.priceInput = page.locator("//input[@id='itemPrice']");
    this.stockInput = page.locator("//input[@id='itemStock']");
    this.addButton = page.locator("//button[text()='Add Item']");
    this.itemNameColumn = page.locator("//table//tbody/tr/td[2]");
    this.invoiceCreatedConfirmation = page.locator(
      "//p[text()='Invoice Created!']"
    );
    this.customerName = page.locator("//input[@id='customerName']");
    this.qtyInput = page.locator("//input[@id='invoiceQty']");
    this.itemSelect = page.locator("//select[@id='invoiceItemSelect']");
    this.createInvoiceButton = page.locator(
      "//button[text()='Create Invoice']"
    );
  }

  /**
   * verfying visibility of the elements
   */

  async verifyElementVisibility() {
    await expect(this.tableTitle).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.priceInput).toBeVisible();
    await expect(this.stockInput).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await expect(this.customerName).toBeVisible();
    await expect(this.itemSelect).toBeVisible();
    await expect(this.qtyInput).toBeVisible();
    await expect(this.createInvoiceButton).toBeVisible();
  }

  /**
   * add new item to the inventory and verify it is added
   */
  async addNewItemAndVerify(itemName, itemPrice, itemStock) {
    await this.nameInput.fill(itemName);
    await this.priceInput.fill(itemPrice);
    await this.stockInput.fill(itemStock);
    await this.addButton.click();
    const lastRow = await this.tablerows.last();
    await expect(lastRow).toContainText(itemName);
    await expect(lastRow).toContainText(`${itemPrice}`);
    await expect(lastRow).toContainText(itemStock);
    const lastItemName = await this.itemNameColumn.last();
    await expect(lastItemName).not.toBeEmpty();
  }

  /**
   * add new item without item name to the inventory and verify it is not added
   */
  async addNewItemWithoutItemName(itemName, itemPrice, itemStock) {
    await this.nameInput.fill(itemName);
    await this.priceInput.fill(itemPrice);
    await this.stockInput.fill(itemStock);
    await this.addButton.click();
    const lastItemName = await this.itemNameColumn.last();
    await expect(lastItemName).not.toBeEmpty();
  }

  /**
   * verify item name cannot be special characters
   */
  async verifyItemNameNoSpecialCharacters(itemName) {
    await this.nameInput.fill(itemName);
    const nameValue = await this.nameInput.inputValue();
    expect(nameValue).not.toMatch(/[^a-zA-Z0-9\s]/);
  }

  /**
   * verify item is duplicated
   */

  async verifyItemIsDuplicated(itemName) {
    // we are intentilally adding the same item again to verify it is not duplicated
    // step one to add same item twice
    for (let i = 0; i < 2; i++) {
      await this.nameInput.fill(itemName);
      await this.priceInput.fill("1700");
      await this.stockInput.fill("9");
      await this.addButton.click();
      await this.page.waitForTimeout(1000);
    }
    // step two to verify item is not duplicated
    const itemNames = this.itemNameColumn;
    const itemCount = await itemNames.count();
    let occurrence = 0;
    for (let i = 0; i < itemCount; i++) {
      const item = await itemNames.nth(i);
      const itemText = await item.textContent();
      if (itemText === itemName) {
        occurrence++;
      }
    }
    expect(occurrence).not.toBeGreaterThan(1);
  }

  /**
   * verifying stock input accepts only non decimal values
   */

  async verifyStockInputNonDecimalValues(stock) {
    await this.stockInput.fill(`${stock}`);
    const stockValue = await this.stockInput.inputValue();
    expect(stockValue).not.toContain(".");
  }

  /**
   * verifying negative values are not accepted in price input
   */
  async verifyPriceInputNonNegativeValues(price) {
    await this.priceInput.fill(`${price}`);
    const priceValue = await this.priceInput.inputValue();
    expect(Number(priceValue)).toBeGreaterThan(0);
  }

  /**
   * veiryfying negative values are not accepted in stock input
   */
  async verifyStockInputNonNegativeValues(stock) {
    await this.stockInput.fill(`${stock}`);
    const stockValue = await this.stockInput.inputValue();
    expect(Number(stockValue)).toBeGreaterThan(0);
  }

  /**
   * verifying price input accepts only positive values
   */
  async verifyPriceInputPositiveValues(price) {
    await this.priceInput.fill(`${price}`);
    const priceValue = await this.priceInput.inputValue();
    expect(Number(priceValue)).toBeGreaterThan(0);
  }

  /**
   * verify item name cannot be mor than 20 characters
   */
  async verifyItemNameMaxLength(itemName) {
    await this.nameInput.fill(itemName);
    const nameValue = await this.nameInput.inputValue();
    expect(nameValue.length).toBeLessThanOrEqual(20);
  }

  /**
   * verify user can create invoice
   */
  async verifyUserCanCreateInvoice(customerName, item, qty) {
    // randimization can cause issue for tracing quntity in stock after invoice creation
    await this.customerName.fill(customerName);
    await this.itemSelect.selectOption(item);
    await this.qtyInput.fill(qty);
    await this.createInvoiceButton.click();
    await expect(this.invoiceCreatedConfirmation).toBeVisible();
  }

  /**
   * verify custmer name cannot be more than 30 characters
   */
  async verifyCustomerNameMaxLength(customerName) {
    await this.customerName.fill(customerName);
    const nameValue = await this.customerName.inputValue();
    expect(nameValue.length).toBeLessThanOrEqual(30);
  }

  /**
   * verify customer name does not accept special characters
   */
  async verifyCustomerNameNoSpecialCharacters(customerName) {
    await this.customerName.fill(customerName);
    const nameValue = await this.customerName.inputValue();
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    const hasSpecialChars = specialCharPattern.test(nameValue);
    expect(hasSpecialChars).toBeFalsy();
  }

  /**
   * customer name cannot be empty
   */
  async verifyCustomerNameNotEmpty(customerName) {
    await this.customerName.fill(customerName);
    const nameValue = await this.customerName.inputValue();
    expect(nameValue).not.toBe("");
  }

  /**
   * verify customer name does not accept numeric values
   */
  async verifyCustomerNameNoNumericValues(customerName) {
    await this.customerName.fill(customerName);
    const nameValue = await this.customerName.inputValue();
    const numericPattern = /[0-9]/g;
    const hasNumericChars = numericPattern.test(nameValue);
    expect(hasNumericChars).toBeFalsy();
  }

  /**
   * verify quantity input accepts only non decimal values
   */
  async verifyQuantityInputNonDecimalValues(qty) {
    await this.qtyInput.fill(`${qty}`);
    const qtyValue = await this.qtyInput.inputValue();
    expect(qtyValue).not.toContain(".");
  }

  /**
   * verify quantity cannot be zero
   */
  async verifyQuantityInputNonZero(qty) {
    await this.qtyInput.fill(`${qty}`);
    const qtyValue = await this.qtyInput.inputValue();
    expect(Number(qtyValue)).toBeGreaterThan(0);
  }
}
