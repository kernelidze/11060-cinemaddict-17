import {createElement} from 'Utils';
import dayjs from 'dayjs';

const createFilmTemplate = (film) => {
  const {description, title, rating, poster, release, duration, genre, comments, watchlist, alreadyWatched, favorite} = film;
  const date = dayjs(release).format('YYYY');

  const watchedClassName = alreadyWatched
    ? 'film-card__controls-item--active'
    : '';

  const favoriteClassName = favorite
    ? 'film-card__controls-item--active'
    : '';

  const watchlistClassName = watchlist
    ? 'film-card__controls-item--active'
    : '';

  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${comments.randomCommentaryCount} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`
  );
};

export default class FilmView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
