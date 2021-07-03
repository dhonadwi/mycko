import config from "./config";

const api_endpoints = {
  allNasabah: `${config.base_url}`,
  detailBayar: (id) => `${config.base_url}bayar/${id}`,
  detailNasabah: (id) => `${config.base_url}id/${id}`,
};

export default api_endpoints;