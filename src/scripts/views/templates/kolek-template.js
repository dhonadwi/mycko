const moment = require('moment');
import BukshelfDbSource from '../../data/bukshelfdb-source';


const createKolekTemplate = async (nasabah) => {
  console.log(nasabah.length)
  const dataBayar = [];
  for(let i = 0; i < nasabah.length; i++){
    const bayar = await BukshelfDbSource.getDetailBayar(nasabah[i].no_pkcab);
    dataBayar.push({
      'no_pk': nasabah[i].no_pkcab,
      'tgl_awal': nasabah[i].tgl_awal,
      'data_bayar': bayar.data.bayar,
    });
  }
  const leen = dataBayar[0].data_bayar.length -1
  const no_pk = dataBayar[0].no_pk; 
  const tgl_akhir_bayar = dataBayar[0].data_bayar[leen].tanggal;
  const terakhirBayar = [];
  for(let i = 0; i < dataBayar.length; i++) {
    const leen = dataBayar[i].data_bayar.length -1
    terakhirBayar.push({
      'no_pk': dataBayar[i].no_pk,
      'tgl_awal': dataBayar[i].tgl_awal,
      'tgl_akhir_bayar': dataBayar[i].data_bayar[leen].tanggal,
      'pembayaran': dataBayar[i].data_bayar.length,
      'tgl_nunggak': moment(dataBayar[i].tgl_awal).add(dataBayar[i].data_bayar.length,'month').format('YYYY-MM-DD'),
    })
  }
  // console.log(`${no_pk} terahir bayar ${tgl_akhir_bayar}`);
  console.log(terakhirBayar);
};

export default createKolekTemplate;
