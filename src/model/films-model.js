import {generateFilm} from '../fish/film.js';

const FILMS_COUNT = 12;

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, generateFilm);

  get films() {
    return this.#films;
  }
}


