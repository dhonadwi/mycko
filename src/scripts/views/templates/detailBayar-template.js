const moment = require('moment') ;
const hitungJtp = (tgl_awal, tenor) => {
  const jtp = {};
  for(let i = 0; i<tenor; i++) {
    jtp[i] = moment(tgl_awal).add(i,'month').format('YYYY-MM-DD');
  }
  return jtp;
}

const createDataBayarTemplate = (nasabah,dataBayar) => {
   const angsuran = nasabah.nasabah[0].angsuran;
  const tenor = nasabah.nasabah[0].tenor;
  const tgl_awal = moment(nasabah.nasabah[0].tgl_awal).format('YYYY-MM-DD');
  const tgl_pk = moment(nasabah.nasabah[0].tgl_pk).format('YYYY-MM-DD');;
  const tgl_jtp = hitungJtp(tgl_awal,tenor);
//   const hisBayar = {};
//   const hisPokok = {};
//   const hisBunga = {};
//   const hisUraian = {};
//   const hisDenda = {}
//   //menyimpan histori transaksi
//   for(let i = 0; i < dataBayar.bayar.length; i++) {
//     const angBayar = dataBayar.bayar[i].pokok+dataBayar.bayar[i].bunga;
//     hisBayar[i+1] = moment(dataBayar.bayar[i].tanggal).format('YYYY-MM-DD');
//     hisPokok[i+1] = dataBayar.bayar[i].pokok;
//     hisBunga[i+1] = dataBayar.bayar[i].bunga;
//     hisUraian[i+1] = dataBayar.bayar[i].uraian;
//     hisDenda[i+1] = dataBayar.bayar[i].denda;
//     if(angBayar>angsuran) {
//       let loop = angBayar/angsuran;
//       for (let a = 1; a<=loop; a++){
//         hisPokok[i+a+1] = 'sudah bayar';
//         hisUraian[i+a+1] = 'sudah bayar';
//       }
//     }
//   };
// console.log(hisUraian);
// console.log(hisPokok);
const hisBayar = [];
const hisPokok = [];
const hisBunga = [];
const hisUraian = [];
const hisDenda = [];
//menyimpan histori transaksi
for(let i = 0; i < dataBayar.bayar.length; i++) {
  const angBayar = dataBayar.bayar[i].pokok+dataBayar.bayar[i].bunga;
  hisBayar.push(moment(dataBayar.bayar[i].tanggal).format('YYYY-MM-DD'));
  hisPokok.push(dataBayar.bayar[i].pokok === undefined ? 0 : dataBayar.bayar[i].pokok);
  hisBunga.push(dataBayar.bayar[i].bunga);
  hisUraian.push(dataBayar.bayar[i].uraian);
  hisDenda.push(dataBayar.bayar[i].denda);
  if(angBayar>angsuran) {
    let loop = angBayar/angsuran;
    for (let a = 1; a<loop; a++){
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
  for(let i = 0; i<= tenor; i++){
    datBayar[i] = {
      jtp: tgl_jtp[i],
      bayar: hisBayar[i],
      pokok: hisPokok[i],
      bunga: hisBunga[i],
      denda: hisDenda[i],
      uraian: hisUraian[i],
    }
  };

  console.log(datBayar);
  const lenDatBayar = Object.keys(datBayar).length;
  
  let inner = `
  <tr>
    <td colspan="5">Tanggal Pencairan : ${tgl_pk}</td>
  </tr>
  <tr>
    <td colspan="5">Tanggal Jatuh Tempo : ${tgl_awal}</td>
  </tr>
  <tr>
    <td colspan="5">Angsuran : ${angsuran}</td>
  </tr>
  <tr>
    <td colspan="5">Tenor : ${tenor}</td>
  </tr>
  <tr>
    <td>No</td>
    <td width='100px'>Tanggal JTP</td>
    <td width='100px'>Tanggal Bayar</td>
    <td>Pokok</td>
    <td>Bunga</td>
    <td>Pembayaran</td>
    <td>Denda</td>
    <td>Uraian</td>
    <td>Keterlambatan</td>
    <td>Nominal Denda</td>
    </tr>`;
    
  let totalDenda = 0;
  let bayarDenda = 0;
  let sisaDenda = 0;
  for(let i=0; i< tenor; i++) {
    console.log(datBayar[tenor].denda);
    let jtp = '';
    let bayar ='';
    let pokok = 0;
    let bunga = 0;
    let denda = 0;
    // let hariDenda = (new Date()- new Date(datBayar[i].jtp)) / 86400000;
    let hariDenda = Math.floor((Date.now()- new Date(datBayar[i].jtp)) / 86400000);
    let nomDenda = 0;
    let uraian = '';

    

    if(datBayar[i].jtp != undefined) {
      jtp = datBayar[i].jtp;
    }
    if(datBayar[i].bayar != undefined) {
      bayar = datBayar[i].bayar;
      hariDenda = (new Date(bayar) - new Date(datBayar[i].jtp)) / 86400000;
    };
    if(datBayar[i].pokok != undefined) {
      pokok = datBayar[i].pokok;
    }
    if(datBayar[i].bunga != undefined) {
      bunga = datBayar[i].bunga;
    }
    if(datBayar[i].denda != undefined) {
      denda = datBayar[i].denda;
      bayarDenda += denda;
    }
    if(datBayar[i].uraian != undefined) {
      uraian = datBayar[i].uraian;
    }
    if(hariDenda > 3 ) {
      let itung = hariDenda * (Math.floor(angsuran * 0.003));
      nomDenda = Math.round(itung / 100) * 100;
      totalDenda += nomDenda;
    }
    
      inner += `
      <tr>
        <td>${i+1}</td>
        <td>${jtp}</td>
        <td>${bayar}</td>
        <td>${pokok}</td>
        <td>${bunga}</td>
        <td>${pokok+bunga+denda}</td>
        <td>${denda}</td>
        <td>${uraian}</td>
        <td>${hariDenda} hari</td>
        <td>${nomDenda}</td>
      </tr>
      `;
      // <td>${moment(datBayar[i].bayar.tanggal).format('YYYY-MM-DD')}</td>
  }
  // console.log(`${moment(datBayar[1].bayar.tanggal).format('YYYY-MM-DD')}`);
  return inner + `
  <tr>
    <td colspan = '5'>Bayar Denda = ${bayarDenda}</td>
  </tr>
  <tr>
  <td colspan = '5'>Total Denda = ${totalDenda}</td>
  </tr>
  <tr>
  <td colspan = '5'>Sisa Denda = ${totalDenda-bayarDenda}</td>
  </tr>
  
  `;
}

export default createDataBayarTemplate;