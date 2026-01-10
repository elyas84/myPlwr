import test from "@playwright/test";
import inventorySchema from "../../apiBase/schema/inventoryJsonSchema.json";
import validInventory from "../../resource/validInventory.json";
import invalidInventory from "../../resource/invalidInventory.json";
import { ApiHelper } from "../../apiBase/apiHelper";
import { RequestHelper } from "../../apiBase/RequestHelper";

test.describe.serial("Inventoty tests", () => {
  // TestId: API-001
  test("01-POST vaidInventory", async ({ request }) => {
    const res = await RequestHelper.POST_INVENTORY(request, validInventory);
    const payload = await res.json();
    console.log(payload);
    await ApiHelper.validateStatusCode(201);
    await ApiHelper.validateJsonBody(validInventory, payload);
  });

  // TestId: API-002
  test("02-POST invaidInventory", async ({ request }) => {
    const res = await RequestHelper.POST_INVENTORY(request, invalidInventory);
    const payload = await res.json();
    await ApiHelper.validateStatusCode(201);
    await ApiHelper.validateJsonBody(invalidInventory, payload);
  });

  // TestId: API-003
  test("03-GET inventories", async ({ request }) => {
    const res = await RequestHelper.GET_INVENTORY(request);
    const payload = await res.json();
    await ApiHelper.validateStatusCode(200);
    await ApiHelper.validateHeaders(res);
    await ApiHelper.validateSchema(inventorySchema, payload);
    await ApiHelper.validateInventoryDataValue(payload);
  });
});
