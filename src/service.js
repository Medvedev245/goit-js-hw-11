import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '39181304-34c4662094c53de77895ac9be',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});

const perPage = instance.defaults.params.per_page;

async function servicePhoto(page, textInput) {
  const paramsObj = { q: textInput, page: page };
  const searchParams = new URLSearchParams(paramsObj);
  const paramsForSearch = searchParams.toString();
  const resp = await instance.get(`?${paramsForSearch}`);

  return resp.data;
}

export { servicePhoto, perPage };
