import AbstractStatefulView from 'Framework/view/abstract-stateful-view.js';
import NewCommentView from 'Views/new-comment-view.js';
import {render} from 'Framework/render.js';

const createPopupTemplate = (film, allComments, emotion, text) => {
  const {
    filmInfo: {
      title,
      totalRating,
      poster,
      release: { date },
      runtime,
      genre,
      description
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite
    }
  } = film;

  const commentsList = allComments.map((comment) => (`
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
        </p>
      </div>
    </li>`
  )).join('');

  const genresList = genre.map((el) => (`
    <span class="film-details__genre">${el}</span>`
  )).join('');

  const watchedClassName = alreadyWatched
    ? 'film-details__control-button--active'
    : '';

  const favoriteClassName = favorite
    ? 'film-details__control-button--active'
    : '';

  const watchlistClassName = watchlist
    ? 'film-details__control-button--active'
    : '';

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Anthony Mann</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${genresList}
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${watchlistClassName} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${watchedClassName} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${favoriteClassName} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsList.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${emotion ? `<img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text ? text : ''}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class PopupView extends AbstractStatefulView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;

    this._state = {
      emotion: null,
      text: null
    };

    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this.#film, this.#comments, this._state.emotion, this._state.text);
  }

  reset = () => {
    this.updateElement({
      emotion: null,
      text: null
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#changeEmotionHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#changeTextInputHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCreateNewCommentHandler(this._callback.createNewComment);
    this.setCommentDeleteButtonClickHandler(this._callback.commentDeleteButtonClick);
    this.setPopupCloseClickHandler(this._callback.popupCloseClick);
    this.setPopupFavoriteClickHandler(this._callback.popupFavoriteClick);
    this.setPopupWatchlistClickHandler(this._callback.popupWatchlistClick);
    this.setPopupWatchedClickHandler(this._callback.popupWatchedClick);
  };

  #changeEmotionHandler = (evt) => {
    const scrollValue = this.element.scrollTop;

    this.updateElement({
      emotion: evt.target.value,
    });

    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) => {
      item.checked = false;
    });

    evt.target.checked = true;

    this.element.scrollTop = scrollValue;
  };

  #changeTextInputHandler = (evt) => {
    this._setState({
      text: evt.target.value,
    });
  };

  setCreateNewCommentHandler = (callback) => {
    this._callback.createNewComment = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#createNewCommentHandler);
  };

  #createNewCommentHandler = (evt) => {
    this._callback.createNewComment();

    if (evt.ctrlKey && evt.keyCode === 13) {
      const newCommentComponent = new NewCommentView(this._state.text, this._state.emotion);

      render(newCommentComponent, this.element.querySelector('.film-details__comments-list'));
    }
  };

  setCommentDeleteButtonClickHandler = (callback) => {
    this._callback.commentDeleteButtonClick = callback;
    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#commentDeleteButtonClickHandler);
  };

  #commentDeleteButtonClickHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      const id = evt.target.getAttribute('data-id');
      this._callback.commentDeleteButtonClick(id);
      evt.target.parentNode.parentNode.parentNode.remove();
    }
  };

  setPopupCloseClickHandler = (callback) => {
    this._callback.popupCloseClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseClickHandler);
  };

  #popupCloseClickHandler = () => {
    this._callback.popupCloseClick();
  };

  setPopupFavoriteClickHandler = (callback) => {
    this._callback.popupFavoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#popupFavoriteClickHandler);
  };

  setPopupWatchlistClickHandler = (callback) => {
    this._callback.popupWatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#popupWatchlistClickHandler);
  };

  setPopupWatchedClickHandler = (callback) => {
    this._callback.popupWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#popupWatchedClickHandler);
  };

  #popupFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupFavoriteClick();
  };

  #popupWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupWatchlistClick();
  };

  #popupWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupWatchedClick();
  };
}
