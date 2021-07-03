const createAllNasabahTemplate = (book) => `
<div class="col s12 m4">
    <h2 class="header">Horizontal Card</h2>
    <div class="card">
      <div class="card-stacked">
        <div class="card-content">
          <p>${book.no_pkcab}</p>
          <p>${book.nama}</p>
          <p>${book.alamat}</p>
        </div>
        <div class="card-action">
          <a href="#detail/${book.no_pkcab}">This is a link</a>
        </div>
      </div>
    </div>
  </div>
`;

export {createAllNasabahTemplate};