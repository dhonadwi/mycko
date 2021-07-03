const createAllNasabahTemplate = (book) => `
<div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${book.no_pkcab} - ${book.nama}</span>
          <p>${book.alamat}</p>
        </div>
        <div class="card-action">
          <a href="#detail/${book.no_pkcab}">Detail</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
`;

export {createAllNasabahTemplate};