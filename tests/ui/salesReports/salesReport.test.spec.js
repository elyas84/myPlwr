import { test } from "../../../base/Fixtures";
import invoices from "../../../resource/invoices.json";

test.describe("Sales report tests", () => {
  test("Sales report", { tag: ["@smoke"] }, async ({ homePage }) => {
    let sales = [];
    for (let i = 0; i < invoices.length; i++) {
      sales.push(
        await homePage.verifySalesReport(
          invoices[i].name,
          invoices[i].item,
          invoices[i].quantity
        )
      );
    }

    await homePage.gatherTotalSales(sales);
  });
});
