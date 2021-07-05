const moment = require('moment');
const hitungJtp = (tgl_awal, tenor) => {
  const jtp = {};
  for (let i = 0; i < tenor; i++) {
    jtp[i] = moment(tgl_awal).add(i, 'month').format('YYYY-MM-DD');
  }
  return jtp;
}
const ribuan = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const createDataBayarTemplate = (nasabah, dataBayar) => {
  // console.log(dataBayar.bayar.length);
  const angsuran = nasabah.nasabah[0].angsuran;
  const tenor = nasabah.nasabah[0].tenor;
  const tgl_awal = moment(nasabah.nasabah[0].tgl_awal).format('YYYY-MM-DD');
  const tgl_pk = moment(nasabah.nasabah[0].tgl_pk).format('YYYY-MM-DD');;
  const tgl_jtp = hitungJtp(tgl_awal, tenor);

  const hisBayar = [];
  const hisPokok = [];
  const hisBunga = [];
  const hisUraian = [];
  const hisDenda = [];
  //menyimpan histori transaksi
  for (let i = 0; i < dataBayar.bayar.length; i++) {
    const angBayar = dataBayar.bayar[i].pokok + dataBayar.bayar[i].bunga;
    hisBayar.push(moment(dataBayar.bayar[i].tanggal).format('YYYY-MM-DD'));
    hisPokok.push(dataBayar.bayar[i].pokok === undefined ? 0 : dataBayar.bayar[i].pokok);
    hisBunga.push(dataBayar.bayar[i].bunga);
    hisUraian.push(dataBayar.bayar[i].uraian);
    hisDenda.push(dataBayar.bayar[i].denda);
    if (angBayar > angsuran) {
      let loop = angBayar / angsuran;
      for (let a = 1; a < loop; a++) {
        hisBayar.push(moment(dataBayar.bayar[i].tanggal).format('YYYY-MM-DD'));
        hisUraian.push(dataBayar.bayar[i].uraian);
        hisDenda.push(0);
        hisPokok.push(0);
        hisBunga.push(0);
      }
    }
  };
  // console.log(hisBayar);
  // console.log(hisUraian);
  // console.log(hisPokok);


  //gabungin data jtp sama histori bayar
  const datBayar = {};
  for (let i = 0; i <= tenor; i++) {
    datBayar[i] = {
      jtp: tgl_jtp[i],
      bayar: hisBayar[i],
      pokok: hisPokok[i],
      bunga: hisBunga[i],
      denda: hisDenda[i],
      uraian: hisUraian[i],
    }
  };

  // console.log(datBayar);
  const lenDatBayar = Object.keys(datBayar).length;
  const headInner = `
  `;
  let inner = `<table class="striped">
  <tr>
    <td colspan="10">Nama : ${nasabah.nasabah[0].nama} | ${nasabah.nasabah[0].no_pk} | ${nasabah.nasabah[0].no_register} (${nasabah.nasabah[0].anggota})</td>
    </tr>
    <tr>
    <td colspan="10">Alamat : ${nasabah.nasabah[0].alamat}, ${nasabah.nasabah[0].kec_domi} | M: ${nasabah.nasabah[0].nm_marketing}</td>
    </tr>
    <tr>
    <td colspan="3">Angsuran : ${ribuan(angsuran)}</td>
    <td colspan="3">Tenor : ${tenor}</td>
    <td colspan="3">Plafond : ${ribuan(nasabah.nasabah[0].plafond)}</td>
  </tr>
  <tr>
    <td rowspan='2'>No</td>
    <td rowspan='2'width='100px'>Tanggal JTP</td>
    <td rowspan='2'width='100px'>Tanggal Bayar</td>
    <td colspan='4' class='centered'>Pembayaran</td>
    <td rowspan='2'>Uraian</td>
    <td rowspan='2'>keterangan</td>
    <td rowspan='2'>Nominal Denda</td>
    </tr>
    <tr>
    <td>Pokok</td>
    <td>Bunga</td>
    <td>Denda</td>
    <td>Total</td>
  </tr>
    `;

  let totalDenda = 0;
  let bayarDenda = 0;
  let sisaDenda = 0;
  // for(let i=0; i< tenor; i++) {
  let cek = 0;
  if (hisBayar.length > tenor) {
    cek = hisBayar.length;
  } else {
    cek = tenor;
  }
  for (let i = 0; i < cek; i++) {
    // console.log(datBayar[tenor].denda);
    let jtp = '';
    let bayar = '';
    let pokok = 0;
    let bunga = 0;
    let denda = 0;
    // let hariDenda = (new Date()- new Date(datBayar[i].jtp)) / 86400000;
    let hariDenda = Math.floor((Date.now() - new Date(datBayar[i].jtp)) / 86400000);
    let nomDenda = 0;
    let uraian = '';



    if (datBayar[i].jtp != undefined) {
      jtp = datBayar[i].jtp;
    }
    if (datBayar[i].bayar != undefined) {
      bayar = datBayar[i].bayar;
      hariDenda = (new Date(bayar) - new Date(datBayar[i].jtp)) / 86400000;
    };
    if (datBayar[i].pokok != undefined) {
      pokok = datBayar[i].pokok;
    }
    if (datBayar[i].bunga != undefined) {
      bunga = datBayar[i].bunga;
    }
    if (datBayar[i].denda != undefined) {
      denda = datBayar[i].denda;
      bayarDenda += denda;
    }
    if (datBayar[i].uraian != undefined) {
      uraian = datBayar[i].uraian;
    }
    if (hariDenda > 3) {
      let itung = hariDenda * (Math.floor(angsuran * 0.003));
      nomDenda = Math.round(itung / 100) * 100;
      totalDenda += nomDenda;
    }

    inner += `<div id='setPrint'>
      <tr>
        <td>${i + 1}</td>
        <td>${jtp}</td>
        <td>${bayar}</td>
        <td>${ribuan(pokok)}</td>
        <td>${ribuan(bunga)}</td>
        <td>${ribuan(denda)}</td>
        <td>${ribuan(pokok + bunga + denda)}</td>
        <td>${uraian}</td>
        <td>${hariDenda} hari</td>
        <td>${ribuan(nomDenda)}</td>
      </tr>
      `;
    // <td>${moment(datBayar[i].bayar.tanggal).format('YYYY-MM-DD')}</td>
  }
  // console.log(`${moment(datBayar[1].bayar.tanggal).format('YYYY-MM-DD')}`);
  return inner + `
  <tr>
    <td colspan = '10'>Bayar Denda = ${ribuan(bayarDenda)}</td>
  </tr>
  <tr>
  <td colspan = '10'>Total Denda = ${ribuan(totalDenda)}</td>
  </tr>
  <tr>
  <td colspan = '10'>Sisa Denda = ${ribuan(totalDenda - bayarDenda)}</td>
  </tr>
  </table>
  `;
}

export default createDataBayarTemplate;