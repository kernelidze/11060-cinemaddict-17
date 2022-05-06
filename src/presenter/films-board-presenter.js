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
    this.filmsModel = filmsModel;
    this.boardFilms = [...this.filmsModel.getFilms()];

    render(this.filmsMainSectionComponent, this.container);
    render(this.filmsListSectionComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListSectionComponent.getElement());

    for (let i = 0; i < this.boardFilms.length; i++) {
      render(new FilmView(this.boardFilms[i]), this.filmsListContainerComponent.getElement());
    }

    render(this.showMoreButtonComponent, this.filmsListSectionComponent.getElement());
    render(this.filmsListSectionTopRatedComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsTopContainerComponent, this.filmsListSectionTopRatedComponent.getElement());

    for (let i = 0; i < CARDS_EXTRA; i++) {
      render(new FilmView(this.boardFilms[i]), this.filmsTopContainerComponent.getElement());
    }

    render(this.filmsListSectionMostCommentedComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsCommentContainerComponent, this.filmsListSectionMostCommentedComponent.getElement());

    for (let i = 0; i < CARDS_EXTRA; i++) {
      render(new FilmView(this.boardFilms[i]), this.filmsCommentContainerComponent.getElement());
    }

    render(new PopupView(this.boardFilms[0]), this.filmsCommentContainerComponent.getElement());

    const commentsList = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < this.boardFilms[0].comments.randomCommentaryCount; i++) {
      render (new CommentView(this.boardFilms[0]), commentsList);
    }
  };
}
