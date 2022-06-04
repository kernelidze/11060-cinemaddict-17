import {generateFilm} from '../fish/film.js';
import Observable from 'Framework/observable.js';

const FILMS_COUNT = 12;

export default class FilmsModel extends Observable {
  #films = Array.from({length: FILMS_COUNT}, generateFilm);

  get films() {
    return this.#films;
  }
}


