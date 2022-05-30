import AbstractView from 'Framework/view/abstract-view.js';

const createNewCommentTemplate = (text, emotion) => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">John Doe</span>
        <span class="film-details__comment-day">2 days ago</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
);

export default class NewCommentView extends AbstractView {
  #text = null;
  #emotion = null;

  constructor(text, emotion) {
    super();
    this.#text = text;
    this.#emotion = emotion;
  }

  get template() {
    return createNewCommentTemplate(this.#text, this.#emotion);
  }
}
