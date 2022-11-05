import View from './view';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    const res = this._data
    return `
    <li class="preview">
      <a class="preview__link ${
        res.id === id ? 'preview__link--active' : ''
      }" href="#${res.id}">
        <figure class="preview__fig">
          <img src="${res.image}" alt="${res.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${res.title}</h4>
          <p class="preview__publisher">${res.publisher}</p>
        </div>
      </a>
    </li>
  `;
  }
}

export default new PreviewView();
