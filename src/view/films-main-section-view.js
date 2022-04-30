import {createElement} from 'Utils';

const createFilmsMainSectionTemplate = () => (
  `<section class="films">
  </section>`
);

export default class FilmsMainSectionView {
  getTemplate() {
    return createFilmsMainSectionTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
