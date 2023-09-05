/**********refs**********/
import { servicePhoto, perPage } from './service';
console.log(servicePhoto);

import Notiflix from 'notiflix';

console.log(perPage);
const elements = {
  container: document.querySelector('.gallery'),
  tgt: document.querySelector('.search-form-js'),
  btnLoad: document.querySelector('.js-load-more'),
};
let page = 1;
let textInput = '';

elements.tgt.addEventListener('submit', hendlerSubmit);
elements.btnLoad.addEventListener('click', handlerLoadMore);

function handlerLoadMore() {
  page += 1;
  servicePhoto(page, textInput)
    .then(data => {
      console.log(data.totalHits);
      elements.container.insertAdjacentHTML('beforeend', createMurcup(data));
      if (data.totalHits / perPage <= page) {
        elements.btnLoad.classList.add('load-more-hidden');
      }
      console.log(data);
    })
    .catch(err => console.log(err));
}

function hendlerSubmit(evt) {
  evt.preventDefault();
  elements.container.innerHTML = '';
  textInput = evt.currentTarget.elements.searchQuery.value;
  servicePhoto(1, textInput)
    .then(response => {
      console.log(response);
      const el = response.hits;
      // console.log(el);

      return createMurcup(response);
    })
    .catch(err => console.log(err));
  // return evt.currentTarget.elements.searchQuery.value
}

function createMurcup(array) {
  const resp = array.hits
    .map(data => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        comments,
        views,
        downloads,
      } = data;
      return `<div class="photo-card">
        <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200" />
      <div class="info">
        <p class="info-item">
          <b>Likes${likes}</b>
        </p>
        <p class="info-item">
          <b>Views${views}</b>
        </p>
        <p class="info-item">
          <b>Comments${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads${downloads}</b>
        </p>
      </div>
      </a>
    </div>
    
    `;
    })
    .join('');

  elements.container.insertAdjacentHTML('beforeend', resp);
  if (array.totalHits > perPage) {
    elements.btnLoad.classList.replace('load-more-hidden', 'load-more');
  }
}
