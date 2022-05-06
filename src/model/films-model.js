import {generateFilm} from '../fish/film.js';

export default class FilmsModel {
  films = Array.from({length: 5}, generateFilm);

  getFilms = () => this.films;
}
