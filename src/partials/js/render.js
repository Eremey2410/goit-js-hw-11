import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let gallery = new SimpleLightbox('.gallery a');

export default function addMarkup(data) {
  if (data.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  const elements = data;
  const markup = elements
    .map(
      element =>
        `<div class="photo-card">
        <a class="gallery-item" href = "${element.largeImageURL}" >
    <img class="gallery-image" src="${element.webformatURL}" 
    alt="${element.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${element.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${element.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${element.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${element.downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  // console.log(elements);

  gallery.refresh();
}
