import BukshelfDbSource from "../data/bukshelfdb-source";
import { createAllNasabahTemplate } from "./templates/allnasabah-template";
import { createLoading } from "./templates/loading-template";
const homePage = {
  async render() {
    return `
    <h2>Home Page</h2>
    <div id='content' class='row'>
      ${createLoading}
    </div>
    `
  },

  async afterRender() {
    const nasabah = await BukshelfDbSource.getAllNasabah();
    const bookContainer = document.querySelector('#content');
    bookContainer.innerHTML = '';
    nasabah.data.nasabah.forEach((book) => {
      bookContainer.innerHTML += createAllNasabahTemplate(book);
    })
    // console.log(nasabah);
    // console.log(nasabah.data.nasabah);
  }
};

export default homePage;