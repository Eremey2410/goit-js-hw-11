import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Refs from './references';

const refs = new Refs();
let gallery = new SimpleLightbox('.gallery a');

export function addMarkup(hits) {
  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  const markup = hits
    .map(
      hit =>
        `<div class="photo-card">
        <a class="gallery-item" href = "${hit.largeImageURL}" >
    <img class="gallery-image" src="${hit.webformatURL}" 
    alt="${hit.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${hit.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${hit.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${hit.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${hit.downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  // console.log(elements);

  gallery.refresh();
}
