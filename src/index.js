import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import { fetchImages } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import throttle  from 'lodash.throttle';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const beforeStart = document.querySelector('#before-start');
const loadMoreBtn = document.querySelector('.load-more');

const messages = {
  failure: `Sorry, there are no images matching your search query. Please try again.`,
  warning: `Please enter your query string`,
}

loadMoreBtn.classList.add('hidden');

form.addEventListener('submit', (e) => getQueryValue(e));

function getQueryValue(e) { 
  e.preventDefault();
  const q = e.target.elements.searchQuery.value;
  if (q === '') {
    Notiflix.Notify.warning(messages.warning);
    return;
  }
  createGallery(q);
  localStorage.getItem('query', q);
};

async function createGallery(q, page = 1, per_page = 49) {
  const data = await fetchImages(q, page, per_page);

  if (data.totalHits === 0) {
    Notiflix.Notify.failure(messages.failure);
    return;
  }

  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  gallery.innerHTML = renderImages(data);
  lightbox.refresh();
  beforeStart.classList.add('hidden');

  window.addEventListener('scroll', throttle(async () => {
    const windowBox = document.documentElement.getBoundingClientRect();
    const clientHeightBox = document.documentElement.clientHeight;

    if (windowBox.bottom < clientHeightBox + 200) {
      try {
        page++;
        const nextPage = await fetchImages(q, page, per_page);
        const markupNextPage = renderImages(nextPage);
        gallery.insertAdjacentHTML('beforeend', markupNextPage);
        lightbox.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  }, 1000))
};

function renderImages(images) {
  const imagesHTML = images.hits.map((image) => {
    return `<a class="photo-link" href="${image.largeImageURL}">
    <div class="photo-card">
      <img class="preview" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
      <div class="info-element">
        <p class="info-item">
          <b>Likes:</b> ${image.likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${image.views}
        </p>
        </div>
        <div class="info-element">
        <p class="info-item">
          <b>Comments:</b> ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${image.downloads}
        </p>
        </div>
      </div>
    </div>
  </a>`}).join('')
  return imagesHTML;
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 150,
  fadeSpeed: 150,
});