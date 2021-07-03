import 'regenerator-runtime';
import '../styles/materialize.min.css';
import '../styles/styles.css';
import './materialize.min.js';
import renderPage from './views/app';

document.addEventListener('DOMContentLoaded', function() {
  var sidenaV = document.querySelectorAll('.sidenav');
  const parallaX = document.querySelectorAll('.parallax');
  M.Sidenav.init(sidenaV);
  M.Parallax.init(parallaX);
});


window.addEventListener('hashchange', () => {
  renderPage();
});
