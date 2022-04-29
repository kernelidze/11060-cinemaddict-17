import ShowMoreButtonView from './view/show-more-button-view.js';
import SortView from './view/sort-view.js';
import NavigationView from './view/navigation-view.js';
import UserView from './view/user-view.js';
import PopupView from './view/popup-view.js';
import FilmsSectionView from './view/films-section-view.js';
import FilmsContainerPresenter from './presenter/films-container-presenter.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.main');
const filmsContainerPresenter = new FilmsContainerPresenter();

render(new UserView(), siteMainElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new FilmsSectionView(), siteMainElement);

const filmsSectionElement = document.querySelector('.films');
const filmsListElement = filmsSectionElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

render(new ShowMoreButtonView(), filmsListElement);
render(new PopupView(), siteMainElement);
filmsContainerPresenter.init(filmsListContainerElement);

