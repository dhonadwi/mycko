import routes from "../routes/routes";

const renderPage = async () => {
  const url = window.location.hash.toLowerCase().substr(1);
  const urlSplit = url.split('/');
  const page = routes[urlSplit[0]];
  document.querySelector('#mainContent').innerHTML = await page.render();
  await page.afterRender();
};

export default renderPage;