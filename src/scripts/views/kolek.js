import BukshelfDbSource from "../data/bukshelfdb-source";
import createKolekTemplate from "./templates/kolek-template";

const kolekPage = {
  async render() {
    return `
    <h2>kolektibilitas</h2>
    <div id='content'></div>
    `
  },

  async afterRender() {
    // document.querySelector('#content').innerHTML = 'abot uy';
    const nasabah = await BukshelfDbSource.getAllNasabah();
    // const bayar = await BukshelfDbSource.getDetailBayar(id[1]);
    createKolekTemplate(nasabah.data.nasabah);
  },
};

export default kolekPage;