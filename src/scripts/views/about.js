const aboutPage = {
  async render() {
    return `
    <h2>Nothing Here</h2>
    <div id='content'></div>
    `
  },

  async afterRender() {
    // document.querySelector('#content').innerHTML = 'abot uy';
  },
};

export default aboutPage;