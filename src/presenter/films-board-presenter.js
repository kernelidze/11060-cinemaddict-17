import {CardFilmView, ShowMoreButtonView, FilmsMainSectionView, FilmsListSectionView, FilmsListContainerView, FilmsListSectionMostCommentedView, FilmsListSectionTopRatedView} from 'Views';
import {render} from 'Utils';

const CARDS_COUNT = 5;
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

  init = (container) => {
    this.container = container;

    render(this.filmsMainSectionComponent, this.container);
    render(this.filmsListSectionComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListSectionComponent.getElement());
    for (let i = 0; i < CARDS_COUNT; i++) {
      render(new CardFilmView(), this.filmsListContainerComponent.getElement());
    }
    render(this.showMoreButtonComponent, this.filmsListSectionComponent.getElement());
    render(this.filmsListSectionTopRatedComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsTopContainerComponent, this.filmsListSectionTopRatedComponent.getElement());
    for (let i = 0; i < CARDS_EXTRA; i++) {
      render(new CardFilmView(), this.filmsTopContainerComponent.getElement());
    }
    render(this.filmsListSectionMostCommentedComponent, this.filmsMainSectionComponent.getElement());
    render(this.filmsCommentContainerComponent, this.filmsListSectionMostCommentedComponent.getElement());
    for (let i = 0; i < CARDS_EXTRA; i++) {
      render(new CardFilmView(), this.filmsCommentContainerComponent.getElement());
    }
  };
}
