import {SortView, NavigationView, UserView} from 'Views';
import {FilmsBoardPresenter} from 'Presenters';
import {render} from 'Framework/render.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, filmsModel, commentsModel);

render(new UserView(), siteMainElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);

filmsBoardPresenter.init();

