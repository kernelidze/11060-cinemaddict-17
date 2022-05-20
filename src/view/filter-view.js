import AbstractView from 'Framework/view/abstract-view.js';

const createFilterTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name.toLowerCase()}}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
    `);
};

const createFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterTemplate(filter)).join('');

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
    </nav>`
  );
};

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
