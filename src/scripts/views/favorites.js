const favoritePage = {
  async render() {
    return `
    <h2>Favorites Page</h2>
    <div id='content'></div>
    `
  },

  async afterRender() {
    document.querySelector('#content').innerHTML = 'fav pisan';
  }
};

export default favoritePage;