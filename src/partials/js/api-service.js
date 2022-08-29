import axios from 'axios';
const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29482486-4af73e7428fa82566a6b382e2';
export default class NewApiService {
  // хранение запроса + номер группы
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  getData() {
    return axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      )
      .then(response => {
        // обработка успешного запроса
        console.log(response.data.hits);
        this.incrementPage();
        return response;
        // return response.data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}