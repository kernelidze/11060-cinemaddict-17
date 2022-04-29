import CardFilmView from '../view/card-film-view.js';
import {render} from '../render.js';

const CARDS_COUNT = 5;

export default class FilmsContainerPresenter {

  init = (container) => {
    this.container = container;

    for (let i = 0; i < CARDS_COUNT; i++) {
      render(new CardFilmView(), this.container);
    }
  };
}
