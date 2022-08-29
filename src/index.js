import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiService from './partials/js/api-service';
import refs from './partials/js/references';
import addMarkup from './partials/js/render';

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
