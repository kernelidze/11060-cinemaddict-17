import {generateComment} from '../fish/comment.js';
import {getRandomInteger} from 'Utils/utils.js';

const COMMENTS_MIN = 10;
const COMMENTS_MAX = 100;
const COMMENTS_COUNT = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);

export default class CommentsModel {
  #comments = Array.from({length: COMMENTS_COUNT}, generateComment);

  get comments() {
    return  this.#comments;
  }
}
