import {render} from 'Utils';
import {
  FilmView,
  ShowMoreButtonView,
  FilmsMainSectionView,
  FilmsListSectionView,
  FilmsListContainerView,
  FilmsListSectionMostCommentedView,
  FilmsListSectionTopRatedView,
  PopupView,
  NoFilmsView
} from 'Views';

const CARDS_EXTRA = 2;
const FILMS_COUNT_PER_STEP = 5;

const getTopRated = (films) =>  films.sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1);
const getMostCommented = (films) =>  films.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);

export default class FilmsBoardPresenter {
  #container = null;
  #filmsModel = null;
  #films = [];
  #commentsModel = null;
  #comments = [];

  #filmsMainSection = new FilmsMainSectionView;
  #filmsListSection = new FilmsListSectionView;
  #mostCommentedSection = new FilmsListSectionMostCommentedView;
  #topRatedSection = new FilmsListSectionTopRatedView;
  #filmsList = new FilmsListContainerView;
  #topRatedList = new FilmsListContainerView;
  #mostCommentedList = new FilmsListContainerView;
  #showMoreButtonComponent = new ShowMoreButtonView;

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    render(this.#filmsMainSection, this.#container);
    render(this.#filmsListSection, this.#filmsMainSection.element);
    render(this.#filmsList, this.#filmsListSection.element);
    render(this.#topRatedSection, this.#filmsMainSection.element);
    render(this.#topRatedList, this.#topRatedSection.element);
    render(this.#mostCommentedSection, this.#filmsMainSection.element);
    render(this.#mostCommentedList, this.#mostCommentedSection.element);

    if (this.#films.length === 0) {
      render(new NoFilmsView(), this.#filmsList.element);
    }

    this.#films.slice(0, FILMS_COUNT_PER_STEP).forEach((film) => {
      this.#renderFilm(film, this.#comments);
    });

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmsListSection.element);

      this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
    }

    getTopRated(this.#films).slice(0, CARDS_EXTRA).forEach((film) => {
      render(new FilmView(film), this.#topRatedList.element);
    });

    getMostCommented(this.#films).slice(0, CARDS_EXTRA).forEach((film) => {
      render(new FilmView(film), this.#mostCommentedList.element);
    });
  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();

    this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
      this.#renderFilm(film, this.#comments);
    });

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film, comments) => {
    const filmComponent = new FilmView(film, comments);
    const popupComponent = new PopupView(film, comments);

    const openPopup = () => {
      this.#container.appendChild(popupComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const closePopup = () => {
      this.#container.removeChild(popupComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      openPopup();
      document.addEventListener('keydown', onEscKeydown);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closePopup();
      document.removeEventListener('keydown', onEscKeydown);
    });

    render(filmComponent, this.#filmsList.element);
  };
}
