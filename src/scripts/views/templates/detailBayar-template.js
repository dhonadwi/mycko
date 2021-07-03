const moment = require('moment') ;
const hitungJtp = (tgl_awal, tenor) => {
  const jtp = {};
  for(let i = 1; i<=tenor; i++) {
    jtp[i] = moment(tgl_awal).add(i,'month').format('YYYY-MM-DD');
  }
  return jtp;
}

const createDataBayarTemplate = (nasabah,dataBayar) => {
  // console.log(nasabah.nasabah[0]);
  const angsuran = nasabah.nasabah[0].angsuran;
  const tenor = nasabah.nasabah[0].tenor;
  const tgl_awal = moment(nasabah.nasabah[0].tgl_awal).format('YYYY-MM-DD');
  const tgl_pk = moment(nasabah.nasabah[0].tgl_pk).format('YYYY-MM-DD');;
  const tgl_jtp = hitungJtp(tgl_pk,tenor);

  const hisBayar = {};
  const hisPokok = {};
  const hisBunga = {};
  const hisUraian = {};
  const hisDenda = {}
  //menyimpan histori transaksi
  for(let i = 0; i < dataBayar.bayar.length; i++) {
    const angBayar = dataBayar.bayar[i].pokok+dataBayar.bayar[i].bunga;
    hisBayar[i+1] = moment(dataBayar.bayar[i].tanggal).format('YYYY-MM-DD');
    hisPokok[i+1] = dataBayar.bayar[i].pokok;
    hisBunga[i+1] = dataBayar.bayar[i].bunga;
    hisUraian[i+1] = dataBayar.bayar[i].uraian;
    hisDenda[i+1] = dataBayar.bayar[i].denda;
    if(angBayar>angsuran) {
      let loop = angBayar/angsuran;
      for (let a = 1; a<=loop; a++){
        hisPokok[i+a+1] = 'sudah bayar';
        hisUraian[i+a+1] = 'sudah bayar';
      }
    }
  };
console.log(hisUraian);
console.log(hisPokok);
  //gabungin data jtp sama histori bayar
  const datBayar = {};
  for(let i = 1; i<= tenor; i++){
    datBayar[i] = {
      jtp: tgl_jtp[i],
      bayar: hisBayar[i],
      pokok: hisPokok[i],
      bunga: hisBunga[i],
      denda: hisDenda[i],
      uraian: hisUraian[i],
    }
  };


  let inner = `<tr>
  <td>No</td>
  <td>Tanggal JTP</td>
  <td>Tanggal Bayar</td>
  <td>Pokok</td>
  <td>Bunga</td>
  <td>Angsuran</td>
  <td>Pembayaran</td>
  <td>Denda</td>
  <td>Uraian</td>
</tr>`;

  for(let i=1; i<= tenor; i++) {
    let bayar ='';
    let pokok ='';
    let bunga = '';
    let denda = '';
    let uraian = '';

    if(datBayar[i].bayar != undefined) {
      bayar = datBayar[i].bayar;
    };
    if(datBayar[i].pokok != undefined) {
      pokok = datBayar[i].pokok;
    }
    if(datBayar[i].bunga != undefined) {
      bunga = datBayar[i].bunga;
    }
    if(datBayar[i].denda != undefined) {
      denda = datBayar[i].denda;
    }
    if(datBayar[i].uraian != undefined) {
      uraian = datBayar[i].uraian;
    }
      inner += `
      <tr>
        <td>${i}</td>
        <td>${datBayar[i].jtp}</td>
        <td>${bayar}</td>
        <td>${pokok}</td>
        <td>${bunga}</td>
        <td>${angsuran}</td>
        <td>${pokok+bunga}</td>
        <td>${denda}</td>
        <td>${uraian}</td>
      </tr>
        `;
      // <td>${moment(datBayar[i].bayar.tanggal).format('YYYY-MM-DD')}</td>
  }
  // console.log(`${moment(datBayar[1].bayar.tanggal).format('YYYY-MM-DD')}`);
  return inner;
}

export default createDataBayarTemplate;