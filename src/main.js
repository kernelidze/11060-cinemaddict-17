import {SortView, NavigationView, UserView} from 'Views';
import {FilmsBoardPresenter} from 'Presenters';
import {render} from 'Utils';
import FilmsModel from './model/films-model.js';

const siteMainElement = document.querySelector('.main');
const filmsBoardPresenter = new FilmsBoardPresenter();
const filmsModel = new FilmsModel();

render(new UserView(), siteMainElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);
filmsBoardPresenter.init(siteMainElement, filmsModel);

