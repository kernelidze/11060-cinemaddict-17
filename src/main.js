import {FiltersView, UserView} from 'Views';
import FilmsBoardPresenter from 'Presenters/films-board-presenter.js';
import {render, RenderPosition} from 'Framework/render.js';
import FilmsModel from 'Models/films-model.js';
import CommentsModel from './model/comments-model.js';
import {generateFilter} from './fish/filter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, filmsModel, commentsModel);

const filters = generateFilter(filmsModel.films);

render(new UserView(), siteHeaderElement);

filmsBoardPresenter.init();

render(new FiltersView(filters), siteMainElement, RenderPosition.AFTERBEGIN);


