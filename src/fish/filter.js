const FilterType = {
  WATCHLIST: 'Watchlist',
  WATCHED: 'History',
  FAVORITES: 'Favorites',
};

const filters = {
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

const generateFilter = (films) => Object.entries(filters).map(
  ([filterName, filterFilms]) => ({
    name: filterName,
    count: filterFilms(films).length,
  }),
);

export {generateFilter};
