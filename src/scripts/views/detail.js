import BukshelfDbSource from "../data/bukshelfdb-source";
import createDataBayarTemplate from "./templates/detailBayar-template";
const detailPage = {
  async render() {
    return `
    <h5>Detail Nasabah</h5>
    <table id='content'>
    </table>
    `
  },

  async afterRender() {
    const url = window.location.hash;
    const id = url.split('/');
    const nasabah = await BukshelfDbSource.getDetailNasabah(id[1]);
    const bayar = await BukshelfDbSource.getDetailBayar(id[1]);
    const container = document.querySelector('#content');
    container.innerHTML = await createDataBayarTemplate(nasabah.data,bayar.data);

  }
};

export default detailPage;