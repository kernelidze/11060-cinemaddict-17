import {render, RenderPosition, remove} from 'Framework/render.js';
import {updateItem, getSortByDate, getSortByRating} from 'Utils/utils.js';
import {SortType} from '../const.js';
import FilmPresenter from 'Presenters/film-presenter.js';
import {
  FilmView,
  ShowMoreButtonView,
  FilmsMainSectionView,
  FilmsListSectionView,
  FilmsListContainerView,
  FilmsListSectionMostCommentedView,
  FilmsListSectionTopRatedView,
  NoFilmsView,
  SortView
} from 'Views';

const FILMS_EXTRA = 2;
const FILMS_COUNT_PER_STEP = 5;

const getTopRated = (films) =>  films.sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1);
const getMostCommented = (films) =>  films.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);

export default class FilmsBoardPresenter {
  #container = null;
  #filmsModel = null;
  #films = [];
  #commentsModel = null;
  #comments = [];

  #filmsMainSection = new FilmsMainSectionView();
  #sortComponent = new SortView();
  #filmsListSection = new FilmsListSectionView();
  #mostCommentedSection = new FilmsListSectionMostCommentedView();
  #topRatedSection = new FilmsListSectionTopRatedView();
  #filmsListContainer = new FilmsListContainerView();
  #topRatedList = new FilmsListContainerView();
  #mostCommentedList = new FilmsListContainerView();
  #noFilmsComponent = new NoFilmsView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    this.#sourcedFilms = [...this.#filmsModel.films];
    this.#renderFilmsBoard();
  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handlePopupChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, this.#comments);
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        getSortByDate(this.#films);
        break;

      case SortType.RATING:
        getSortByRating(this.#films);
        break;

      case SortType.DEFAULT:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderFilmsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilm = (film, comments) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainer.element, this.#handleFilmChange, this.#handlePopupChange);
    filmPresenter.init(film, comments);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#films.slice(from, to).forEach((film) => this.#renderFilm(film, this.#comments));
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#filmsListContainer.element, RenderPosition.AFTERBEGIN);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsListSection.element);

    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;

    remove(this.#showMoreButtonComponent);
  };

  #renderFilmsList = () => {
    render(this.#filmsListContainer, this.#filmsListSection.element);
    this.#renderFilms(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP));

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilmsBoard = () => {
    render(this.#filmsMainSection, this.#container);
    render(this.#filmsListSection, this.#filmsMainSection.element);

    render(this.#topRatedSection, this.#filmsMainSection.element);
    render(this.#topRatedList, this.#topRatedSection.element);

    render(this.#mostCommentedSection, this.#filmsMainSection.element);
    render(this.#mostCommentedList, this.#mostCommentedSection.element);

    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    this.#renderFilmsList();
    this.#renderTopRatedFilms();
    this.#renderMostCommentedFilms();
  };

  #renderMostCommentedFilms = () => {
    getMostCommented(this.#films).slice(0, FILMS_EXTRA).forEach((film) => {
      render(new FilmView(film), this.#mostCommentedList.element);
    });
  };

  #renderTopRatedFilms = () => {
    getTopRated(this.#films).slice(0, FILMS_EXTRA).forEach((film) => {
      render(new FilmView(film), this.#topRatedList.element);
    });
  };
}
