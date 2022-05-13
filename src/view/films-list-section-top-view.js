import AbstractView from 'Framework/view/abstract-view.js';

const createFilmsListSectionTopRatedTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
  </section>`
);

export default class FilmsListSectionTopRatedView extends AbstractView {
  get template() {
    return createFilmsListSectionTopRatedTemplate();
  }
}
