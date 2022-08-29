import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiService from './partials/js/api-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnLoadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};
const newsApiService = new NewApiService();
// console.log(newsApiService);
let gallery = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearchForm(event) {
  event.preventDefault();
  clearMarkup();

  newsApiService.query = event.currentTarget.elements.searchQuery.value;

  newsApiService.resetPage();
  // console.log(newsApiService);
  newsApiService
    .getData()
    .then(response => {
      if (response.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      }
      return response.data.hits;
    })
    .then(hits => {
      addMarkup(hits), removeClassIsHidden();
      console.log(hits);
    })
    .catch(error => {
      console.log(error);
    });
}

function onLoadMore() {
  newsApiService
    .getData()
    .then(response => {
      return response.data.hits;
    })
    .then(addMarkup)
    .catch(error => {
      console.log(error);
      addClassIsHidden();
      Notify.info("We're sorry, but you've reached the end of search results.");
    });
  smoothScroll();
}
function addMarkup(hits) {
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
function clearMarkup() {
  refs.gallery.innerHTML = '';
}
function removeClassIsHidden() {
  refs.btnLoadMore.classList.remove('is-hidden');
}
function addClassIsHidden() {
  refs.btnLoadMore.classList.add('is-hidden');
}
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
