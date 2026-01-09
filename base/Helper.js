/**
 * THIS IS A HELPER CLASS TO PROVIDE GENERIC METHODS
 */
export class Helper {
  /**
   * Convet string to json and get value by key
   */
  static async getValueFromStringAsJson(stringData, key) {
    const jsonData = JSON.parse(stringData);
    return jsonData[key];
  }

  /**
   * Convet string to json and get value
   */
  static async getEntireValueFromStringAsJson(stringData) {
    const jsonData = JSON.parse(stringData);
    return jsonData;
  }

  /**
   * conver json value to string
   */
  static async convertJsonValueToString(jsonData) {
    return JSON.stringify(jsonData);
  }
}
