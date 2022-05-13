import AbstractView from 'Framework/view/abstract-view.js';

const createFilmsListSectionMostCommentedTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
  </section>`
);

export default class FilmsListSectionMostCommentedView extends AbstractView {
  get template() {
    return createFilmsListSectionMostCommentedTemplate();
  }
}
