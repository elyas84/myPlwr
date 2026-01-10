import { expect } from "@playwright/test";
import Ajv from "ajv";
const ajv = new Ajv();

export class ApiHelper {
  /**
   * validate status code
   */

  static async validateStatusCode(statusCode) {
    expect(statusCode).toBe(statusCode);
  }

  static async validateHeaders(res) {
    const contentType = res.headers()["content-type"];
    expect(contentType).toContain("application/json");
  }

  /**
   * shema validation
   */

  static async validateSchema(schema, payload) {
    const validate = ajv.compile(schema);
    const valid = validate(payload);
    if (!valid) console.log(validate.errors);
    expect(valid).toBe(true);
  }

  /**
   * validate values
   */

  static async validateInventoryDataValue(payload) {
    payload.forEach((obj) => {
      expect(obj.id).toBeDefined(); //63f1c2a1e8b7f12a3d4e5f01 --> real time id
      expect(Number.isInteger(obj.id)).toBe(true); // Here we have customised id (1, 2, 3)
      expect(obj.name).toBeDefined(); // john doe
      expect(obj.name.length).toBeGreaterThan(0); // john doe
      expect(obj.price).toBeGreaterThan(0); // 14 -16, 0
      expect(obj.stock).toBeGreaterThan(0);
      expect(Number.isInteger(obj.price)).toBe(true);
      expect(Number.isInteger(obj.stock)).toBe(true);
    });
  }

  /**
   * validating post request
   */

  static async validateJsonBody(data, payload) {
    expect(data.name).toBe(payload.name);
    expect(data.price).toBe(payload.price);
    expect(data.stock).toBe(payload.stock);
  }
}
