import BukshelfDbSource from "../data/bukshelfdb-source";
import { createAllNasabahTemplate } from "./templates/allnasabah-template";
import { createLoading } from "./templates/loading-template";
const iNasabah = {
  async render() {
    return `
    <h5>Cari No. PK</h5>
    <input id='nopk' type="number">
    <div id='content' class='row'>
    </div>
    `
    // <button id='btnCari' class='btn'>Cari</button>
  },

  async afterRender() {
    const inputPk = document.querySelector('#nopk');
    inputPk.focus();
    const btnCari = document.querySelector('#btnCari');
    inputPk.addEventListener('keyup', async (event) => {
      if (event.keyCode === 13) {
        const nasabah = await BukshelfDbSource.getDetailNasabah(inputPk.value);
        if (nasabah.status === 'fail') {
          alert('nasabah tidak ada');
        } else {
          const nasabahContainer = document.querySelector('#content');
          nasabahContainer.innerHTML += createAllNasabahTemplate(nasabah.data.nasabah[0]);
        }
      }
    })
    // btnCari.addEventListener('click', async () => {
    //   // alert('OK');
    //   const nasabah = await BukshelfDbSource.getDetailNasabah(inputPk.value);
    //   // const bayar = await BukshelfDbSource.getDetailBayar(id[1]);
    //   const nasabahContainer = document.querySelector('#content');
    //   nasabahContainer.innerHTML += createAllNasabahTemplate(nasabah.data.nasabah[0]);
    // })
    // bookContainer.innerHTML = '';
    // nasabah.data.nasabah.forEach((book) => {
    //   bookContainer.innerHTML += createAllNasabahTemplate(book);
    // })
  }
};

export default iNasabah;