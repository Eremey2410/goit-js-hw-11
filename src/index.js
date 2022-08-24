import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './api-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnLoadMore: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMore);

let searchQuery = '';

function onSearchForm(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.searchQuery.value;

  API.getData(searchQuery);
  console.log(API.getData());
}

function onLoadMore() {
  API.getData(searchQuery);
}
