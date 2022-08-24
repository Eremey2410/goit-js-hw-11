import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29482486-4af73e7428fa82566a6b382e2';
let page = 1;

// function getData(name, page) {
//   axios
//     .get(
//       `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//     )
//     .then(function (response) {
//       // обработка успешного запроса
//       console.log(response);
//     })
//     .catch(function (error) {
//       // обработка ошибки
//       console.log(error);
//     });
// }

async function getData(name, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  //   return response;
}

export default { getData };
// axios
//   .get(
//     `${BASE_URL}?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
//   )
//   .then(function (response) {
//     // обработка успешного запроса
//     console.log(response);
//   })
//   .catch(function (error) {
//     // обработка ошибки
//     console.log(error);
//   });
