import BukshelfDbSource from "../data/bukshelfdb-source";
import createDataBayarTemplate from "./templates/detailBayar-template";
import { createLoading } from "./templates/loading-template";
const detailPage = {
  async render() {
    return `
    <h2>Detail Page</h2>
    <table id='content'>
      
      ${createLoading}
    </table>
    `
  },

  async afterRender() {
    const url = window.location.hash;
    const id = url.split('/');
    const nasabah = await BukshelfDbSource.getDetailNasabah(id[1]);
    const bayar = await BukshelfDbSource.getDetailBayar(id[1]);
    const container = document.querySelector('#content');
    container.innerHTML ='';
    container.innerHTML = await createDataBayarTemplate(nasabah.data,bayar.data);

  }
};

export default detailPage;