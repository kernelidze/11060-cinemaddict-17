import AbstractView from 'Framework/view/abstract-view.js';

const MAX_LENGTH = 140;
const REGEXP = /.{1}$/;

const createFilmTemplate = (film) => {
  const {
    comments,
    filmInfo: {
      title,
      totalRating,
      poster,
      release: { date },
      runtime,
      genre,
      description
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite
    }
  } = film;

  const watchedClassName = alreadyWatched
    ? 'film-card__controls-item--active'
    : '';

  const favoriteClassName = favorite
    ? 'film-card__controls-item--active'
    : '';

  const watchlistClassName = watchlist
    ? 'film-card__controls-item--active'
    : '';

  const slicedDescription = description.length > MAX_LENGTH
    ? description.slice(0, MAX_LENGTH).replace(REGEXP, '...')
    : description;

  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${slicedDescription}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`
  );
};

export default class FilmView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmTemplate(this.#film);
  }

  setFilmClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#filmClickHandler);
  };

  #filmClickHandler = () => {
    this._callback.click();
  };
}
