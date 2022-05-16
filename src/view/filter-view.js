import AbstractView from 'Framework/view/abstract-view.js';

const getFirstLetterUppercase = (word) => word[0].toUpperCase() + word.slice(1);

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;

  return (`
  <a href="#${name}}" class="main-navigation__item">${getFirstLetterUppercase(name)} <span class="main-navigation__item-count">${count}</span></a>
  `);
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter)).join('');

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
    </nav>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
