import { expect } from "@playwright/test";
import { Helper } from "../base/Helper";

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
    this.itemPriceColumn = page.locator("//table//tbody/tr/td[3]");
    this.itemStockColumn = page.locator("//table//tbody/tr/td[4]");
    this.invoiceCreatedConfirmation = page.locator(
      "//p[text()='Invoice Created!']"
    );
    this.customerName = page.locator("//input[@id='customerName']");
    this.qtyInput = page.locator("//input[@id='invoiceQty']");
    this.itemSelect = page.locator("//select[@id='invoiceItemSelect']");
    this.createInvoiceButton = page.locator(
      "//button[text()='Create Invoice']"
    );
    this.invoiceStringData = page.locator(
      "//div[@id='invoiceResult']/p/following-sibling::*[1]"
    );
  }

  // =======================================================
  // INVENTORY TEST METHODS START HERE
  // ==================================================

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
   * Common fucntion to add Items
   */

  async addItemAndSubmit(itemName, itemPrice, itemStock) {
    await this.nameInput.fill(itemName);
    await this.priceInput.fill(`${itemPrice}`);
    await this.stockInput.fill(`${itemStock}`);
    await this.addButton.click();
  }

  /**
   * add new item to the inventory and verify it is added
   */
  async addNewItemAndVerify(itemName, itemPrice, itemStock) {
    await this.addItemAndSubmit(itemName, itemPrice, itemStock);
    const lastRow = await this.tablerows.last();
    await expect(lastRow).toContainText(itemName);
    await expect(lastRow).toContainText(`${itemPrice}`);
    await expect(lastRow).toContainText(`${itemStock}`);
    const lastItemName = await this.itemNameColumn.last();
    await expect(lastItemName).not.toBeEmpty();
  }

  /**
   * add new item without item name to the inventory and verify it is not added
   */
  async addNewItemWithoutItemName(itemName, itemPrice, itemStock) {
    await this.addItemAndSubmit(itemName, itemPrice, itemStock);
    const lastItemName = await this.itemNameColumn.last();
    await expect(lastItemName).not.toBeEmpty();
  }

  /**
   * verify item name cannot be special characters
   */
  async verifyItemNameNoSpecialCharacters(itemName, itemPrice, itemStock) {
    await this.addItemAndSubmit(itemName, itemPrice, itemStock);
    const sentItemTitle = await this.itemNameColumn.last().textContent();
    //await this.page.waitForTimeout(1000);
    expect(sentItemTitle).not.toMatch(/[^a-zA-Z0-9\s]/);
  }

  /**
   * verify item is duplicated
   */

  async verifyItemIsDuplicated(itemName, itemPrice, itemStock) {
    // we are intentilally adding the same item again to verify it is not duplicated
    // step one to add same item twice
    for (let i = 0; i < 2; i++) {
      await this.addItemAndSubmit(itemName, itemPrice, itemStock);
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

  async verifyStockInputNonDecimalValues(itemName, itemPrice, itemStock) {
    await this.addItemAndSubmit(itemName, itemPrice, itemStock);
    const stockValue = await this.itemStockColumn.last().textContent();
    expect(stockValue).not.toContain(".");
  }

  /**
   * verifying negative values are not accepted in price input
   */
  async verifyPriceInputNonNegativeValues(itemName, itemPrice, itemStock) {
    await this.addItemAndSubmit(itemName, itemPrice, itemStock);
    const priceValue = await this.itemPriceColumn.last().textContent();
    expect(Number(priceValue.substring(1))).toBeGreaterThan(0);
  }

  /**
   * veiryfying negative values are not accepted in stock input
   */
  async verifyStockInputNonNegativeValues(itemName, itemPrice, itemStock) {
    await this.addItemAndSubmit(itemName, itemPrice, itemStock);
    const stockValue = await this.itemStockColumn.last().textContent();
    expect(Number(stockValue)).toBeGreaterThan(0);
  }

  /**
   * verifying price input accepts only positive values
   */
  async verifyPriceInputPositiveValues(itemName, itemPrice, itemStock) {
    await this.addItemAndSubmit(itemName, itemPrice, itemStock);
    const priceValue = await this.itemPriceColumn.last().textContent();
    expect(Number(priceValue)).toBeGreaterThan(0);
  }

  /**
   * verify item name cannot be mor than 20 characters
   */
  async verifyItemNameMaxLength(itemName, itemPrice, itemStock) {
    await this.addItemAndSubmit(itemName, itemPrice, itemStock);
    const nameValue = await this.itemNameColumn.last().textContent();
    expect(nameValue.length).toBeLessThanOrEqual(20);
  }

  // =======================================================
  // INVENTORY TEST METHODS START END HERE
  // ==================================================

  // =======================================================
  // INVOICES TEST METHODS START HERE
  // ==================================================

  /**
   * Common fucntion to add invoce
   */

  async addInvoiceAndSubmit(customerName, item, qty) {
    await this.customerName.fill(customerName);
    await this.itemSelect.selectOption(item);
    await this.qtyInput.fill(`${qty}`);
    await this.createInvoiceButton.click();
  }

  /**
   * verify user can create invoice
   */
  async verifyUserCanCreateInvoice(customerName, item, qty) {
    // randimization can cause issue for tracing quntity in stock after invoice creation
    await this.addInvoiceAndSubmit(customerName, item, qty);
    await expect(this.invoiceCreatedConfirmation).toBeVisible();
  }

  /**
   * verify custmer name cannot be more than 30 characters
   */
  async verifyCustomerNameMaxLength(customerName, item, qty) {
    await this.addInvoiceAndSubmit(customerName, item, qty);
    /**
     * we are getting json format string value
     * from the invoice result section and converting it to json to get
     * the customer name value and verify its length
     */
    const jsonBody = await this.invoiceStringData.textContent();
    const nameInInvoice = await Helper.getValueFromStringAsJson(
      jsonBody,
      "customerName"
    );
    expect(nameInInvoice.length).toBeLessThanOrEqual(30);
  }

  /**
   * verify customer name does not accept special characters
   */
  async verifyCustomerNameNoSpecialCharacters(customerName, item, qty) {
    await this.addInvoiceAndSubmit(customerName, item, qty);
    const jsonBody = await this.invoiceStringData.textContent();
    const nameInInvoice = await Helper.getValueFromStringAsJson(
      jsonBody,
      "customerName"
    );
    expect(nameInInvoice).not.toMatch(/[^a-zA-Z0-9\s]/);
  }

  /**
   * customer name cannot be empty
   */
  async verifyCustomerNameNotEmpty(customerName, item, qty) {
    await this.addInvoiceAndSubmit(customerName, item, qty);
    const jsonBody = await this.invoiceStringData.textContent();
    const nameInInvoice = await Helper.getValueFromStringAsJson(
      jsonBody,
      "customerName"
    );
    expect(nameInInvoice).not.toBe("");
  }

  /**
   * verify customer name does not accept numeric values
   */
  async verifyCustomerNameNoNumericValues(customerName, item, qty) {
    await this.addInvoiceAndSubmit(customerName, item, qty);
    const jsonBody = await this.invoiceStringData.textContent();
    const nameInInvoice = await Helper.getValueFromStringAsJson(
      jsonBody,
      "customerName"
    );
    const numericPattern = /[0-9]/g;
    const hasNumericChars = numericPattern.test(nameInInvoice);
    expect(hasNumericChars).toBeFalsy();
  }

  /**
   * verify quantity input accepts only non decimal values
   */
  async verifyQuantityInputNonDecimalValues(customerName, item, qty) {
    await this.addInvoiceAndSubmit(customerName, item, qty);
    const jsonBodyString = await this.invoiceStringData.textContent(); // retun string
    /**
     * this is sample json body we are getting from the invoice result section
     */
    const jsonBody = await Helper.getEntireValueFromStringAsJson(
      jsonBodyString
    );

    const quantity = jsonBody.items[0].quantity;
    // convert quantity to string to verify it does not contain decimal point

    expect(await Helper.convertJsonValueToString(quantity)).not.toContain(".");
  }

  /**
   * verify quantity cannot be zero
   */
  async verifyQuantityInputNotZero(customerName, item, qty) {
    await this.addInvoiceAndSubmit(customerName, item, qty);
    const jsonBodyString = await this.invoiceStringData.textContent();

    /**
     * this is sample json body we are getting from the invoice result section
     * {
  "id": 3,
  "customerName": "sfsdf",
  "items": [
    {
      "itemId": 1,
      "name": "Laptop",
      "price": 1200,
      "quantity": 1
    }
  ],
  "total": 1200,
  "date": "2026-01-09T20:20:49.299Z"
}
     */
    const jsonBody = await Helper.getEntireValueFromStringAsJson(
      jsonBodyString
    );
    const quantity = jsonBody.items[0].quantity;
    expect(quantity).toBeGreaterThan(0);
  }

  // =======================================================
  // INVOICES TEST METHODS END HERE
  // ==================================================
}
