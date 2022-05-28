import {render, replace, remove} from 'Framework/render.js';
import {FilmView, PopupView} from 'Views';

const Mode = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED'
};

export default class FilmPresenter {
  #filmsListContainer = null;
  #filmComponent = null;
  #popupComponent = null;
  #film = null;
  #comments = null;
  #changeData = null;
  #changePopup = null;
  #mode = Mode.CLOSED;

  constructor(filmsListContainer, changeData, changePopup) {
    this.#filmsListContainer = filmsListContainer;
    this.#changeData = changeData;
    this.#changePopup = changePopup;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmComponent = new FilmView(film);
    this.#popupComponent = new PopupView(film, comments);

    this.#filmComponent.setFilmClickHandler(this.#handleFilmClick);

    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatchedClick);

    this.#popupComponent.setPopupFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setPopupWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setPopupWatchedClickHandler(this.#handleWatchedClick);

    this.#popupComponent.setPopupCloseClickHandler(this.#handlePopupClose);

    this.#popupComponent.setCommentDeleteButtonClickHandler(this.#handleDeleteCommentClick);

    this.#popupComponent.setCreateNewCommentHandler(this.#handleInputClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this.#filmComponent, this.#filmsListContainer);
      return;
    }

    if (this.#filmsListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.OPENED) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.CLOSED) {
      this.#popupComponent.reset();
      this.#closePopup();
    }
  };


  #handleInputClick = () => {
  };

  #handleDeleteCommentClick = () => {
  };

  #handleFilmClick = () => {
    document.querySelector('.main').appendChild(this.#popupComponent.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#changePopup();
    this.#mode = Mode.OPENED;
  };

  #closePopup = () => {
    document.querySelector('.main').removeChild(this.#popupComponent.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.CLOSED;
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#popupComponent.reset();
      this.#closePopup();
    }
  };

  #handlePopupClose = () => {
    this.#closePopup();
  };

  #handleFavoriteClick = () => {
    const scrollValue = this.#popupComponent.element.scrollTop;
    this.#changeData({...this.#film, userDetails: { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}});
    this.#popupComponent.element.scrollTop = scrollValue;
  };

  #handleWatchlistClick = () => {
    const scrollValue = this.#popupComponent.element.scrollTop;
    this.#changeData({...this.#film, userDetails: { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}});
    this.#popupComponent.element.scrollTop = scrollValue;
  };

  #handleWatchedClick = () => {
    const scrollValue = this.#popupComponent.element.scrollTop;
    this.#changeData({...this.#film, userDetails: { ...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
    this.#popupComponent.element.scrollTop = scrollValue;
  };
}
