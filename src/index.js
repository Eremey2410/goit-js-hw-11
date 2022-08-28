import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiService from './api-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnLoadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};
const newsApiService = new NewApiService();
// console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearchForm(event) {
  event.preventDefault();

  clearMarkup();

  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  if (newsApiService.query !== '') {
    newsApiService.resetPage();
    console.log(newsApiService);
    newsApiService
      .getData()
      .then(response => {
        console.log(response);
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

        return response.data.hits;
      })
      .then(data => addMarkup(data), removeClassIsHidden())
      .catch(error => {
        console.log(error);
      });
  } else {
    Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
    addClassIsHidden();
    return;
  }
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
function addMarkup(data) {
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

  let gallery = new SimpleLightbox('.gallery a');
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
