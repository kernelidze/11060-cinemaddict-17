import {SortView, NavigationView, UserView, PopupView} from 'Views';
import {FilmsBoardPresenter} from 'Presenters';
import {render} from 'Utils';

const siteMainElement = document.querySelector('.main');
const filmsBoardPresenter = new FilmsBoardPresenter();

render(new UserView(), siteMainElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);
filmsBoardPresenter.init(siteMainElement);
render(new PopupView(), siteMainElement);

