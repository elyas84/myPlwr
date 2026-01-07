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
  }
}
