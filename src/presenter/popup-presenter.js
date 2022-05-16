import {PopupView} from 'Views';

export default class PopupPresenter {
  #film = null;
  #comments = [];

  constructor(film, comments) {
    this.#film = film;
    this.#comments = comments;
  }

  renderPopup = () => {
    const popupComponent = new PopupView(this.#film, this.#comments);
    const siteMainElement = document.querySelector('.main');

    siteMainElement.appendChild(popupComponent.element);
    document.body.classList.add('hide-overflow');

    const closePopup = () => {
      siteMainElement.removeChild(popupComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    document.addEventListener('keydown', onEscKeydown);

    popupComponent.setPopupCloseClickHandler(() => {
      closePopup();
      document.removeEventListener('keydown', onEscKeydown);
    });
  };

}
