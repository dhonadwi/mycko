import api_endpoints from "../globals/api-endpoints";

class BukshelfDbSource {
  static async getAllNasabah() {
    const response = await fetch(api_endpoints.allNasabah);
    const responseJson = await response.json();
    return responseJson;
  }

  static async getDetailNasabah(id) {
    const response = await fetch(api_endpoints.detailNasabah(id));
    const responseJson = await response.json();
    return responseJson;
  }
  static async getDetailBayar(id) {
    const response = await fetch(api_endpoints.detailBayar(id));
    const responseJson = await response.json();
    return responseJson;
  }
};

export default BukshelfDbSource;