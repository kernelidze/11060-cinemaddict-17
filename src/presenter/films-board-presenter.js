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
  CommentView
} from 'Views';

const CARDS_EXTRA = 2;

export default class FilmsBoardPresenter {
  filmsMainSectionComponent = new FilmsMainSectionView;
  filmsListSectionComponent = new FilmsListSectionView;
  filmsListContainerComponent = new FilmsListContainerView;
  showMoreButtonComponent = new ShowMoreButtonView;
  filmsListSectionMostCommentedComponent = new FilmsListSectionMostCommentedView;
  filmsListSectionTopRatedComponent = new FilmsListSectionTopRatedView;
  filmsTopContainerComponent = new FilmsListContainerView;
  filmsCommentContainerComponent = new FilmsListContainerView;

  init = (container, filmsModel) => {
    this.container = container;
    this.films = [...filmsModel.getFilms()];

    render(this.filmsMainSectionComponent, this.container);
    render(this.filmsListSectionComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListSectionComponent.getElement());

    this.films.forEach((film) => {
      render(new FilmView(film), this.filmsListContainerComponent.getElement());
    });

    render(this.showMoreButtonComponent, this.filmsListSectionComponent.getElement());
    render(this.filmsListSectionTopRatedComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsTopContainerComponent, this.filmsListSectionTopRatedComponent.getElement());

    this.films.slice(0, CARDS_EXTRA).forEach((film) => {
      render(new FilmView(film), this.filmsTopContainerComponent.getElement());
    });

    render(this.filmsListSectionMostCommentedComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsCommentContainerComponent, this.filmsListSectionMostCommentedComponent.getElement());

    this.films.slice(0, CARDS_EXTRA).forEach((film) => {
      render(new FilmView(film), this.filmsCommentContainerComponent.getElement());
    });

    render(new PopupView(this.films[0]), this.filmsCommentContainerComponent.getElement());

    const commentsList = document.querySelector('.film-details__comments-list');

    this.films.slice(0, this.films[0].comments.randomCommentaryCount).forEach((film) => {
      render (new CommentView(film), commentsList);
    });
  };
}
