import dotenv from "dotenv";
dotenv.config();
export class RequestHelper {
  /**
   * Send GET request
   */
  static async GET_INVENTORY(request) {
    const res = await request.get(process.env.API_URI + "/inventory");
    return res;
  }

  /**
   * Send GET request By ID
   */
  static async GET_INVENTORY_BY_ID(request, id) {
    const res = await request.get(process.env.API_URI + "/inventory/" + id);
    return res;
  }

  /**
   * Send POST request
   */
  static async POST_INVENTORY(request, data) {
    const res = await request.post(process.env.API_URI + "/inventory", {
      data,
    });
    return res;
  }
}
