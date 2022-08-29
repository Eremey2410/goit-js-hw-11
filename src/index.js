import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiService from './js/api-service';
import Refs from './js/references';
import { addMarkup } from './js/render';

const refs = new Refs();
const newsApiService = new NewApiService();
// console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSearchForm(event) {
  event.preventDefault();
  clearMarkup();

  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  if (newsApiService.query === '') {
    return;
  }
  newsApiService.resetPage();
  // console.log(newsApiService);
  const dataNewsApiService = await newsApiService
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
      if (hits.length < 40) {
        addClassIsHidden();
        addMarkup(hits);
        return;
      }
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
