import BukshelfDbSource from "../data/bukshelfdb-source";
import printDiv from "../utils/print-div";
import createDataBayarTemplate from "./templates/detailBayar-template";
const detailPage = {
  async render() {
    return `
    <h5>Detail Nasabah</h5>
    <div id="content">
   
    </table>
    </div>
    <td><button id="btnPrint" class="btn">Print</button></td>
    `
  },

  async afterRender() {
    const url = window.location.hash;
    const id = url.split('/');
    const nasabah = await BukshelfDbSource.getDetailNasabah(id[1]);
    const bayar = await BukshelfDbSource.getDetailBayar(id[1]);
    const container = document.querySelector('#content');
    container.innerHTML = await createDataBayarTemplate(nasabah.data, bayar.data);
    document.querySelector('#btnPrint').addEventListener('click', () => {
      printDiv('content');
    })
    // document.querySelector('#cek').addEventListener('click', () => {
    //   document.getElementById('content').style.fontSize = "6px";
    //   // document.getElementById('content').style.padding = "0";
    //   // document.getElementById('content').style.margin = "0";
    // })

  }
};

export default detailPage;