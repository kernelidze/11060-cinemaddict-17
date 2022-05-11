import dayjs from 'dayjs';
import {getRandomInteger, getRandomFraction, getRandomRangeFromArray} from 'Utils';

const MIN_RATING = 0;
const MAX_RATING = 10;
const DECIMAL_RATING = 1;
const MAX_YEAR_GAP = 70;
const MIN_HOURS_DURATION = 1;
const MAX_HOURS_DURATION = 3;
const MIN_MINUTES_DURATION = 10;
const MAX_MINUTES_DURATION = 59;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 20;
const MIN_RANGE = 1;
const MAX_RANGE = 50;

let currentId = 0;

const titles = [
  'Gladiator',
  'South Park',
  'Simpsons',
  'Sweet November',
  'Fate Zero'
];

const genres = [
  'Comedy',
  'Musical',
  'Cartoon',
  'Drama',
  'Action'
];

const posters = [
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-great-flamarion.jpg',
  'made-for-each-other.png',
  'the-man-with-the-golden-arm.jpg'
];

const descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateId = () => {
  currentId++;

  return currentId - 1;
};

const generateFilmTitle = () => titles[getRandomInteger(0, titles.length - 1)];

const generateFilmRating = () => getRandomFraction(MIN_RATING, MAX_RATING, DECIMAL_RATING);

const generateFilmYear = () => {
  const yearsGap = getRandomInteger(-MAX_YEAR_GAP, 0);
  const date = dayjs().add(yearsGap, 'year').toDate();

  return dayjs(date).format('YYYY');
};

const generateFilmDuration = () => `${getRandomInteger(MIN_HOURS_DURATION, MAX_HOURS_DURATION)  }h ${  getRandomInteger(MIN_MINUTES_DURATION, MAX_MINUTES_DURATION)  }m`;

const generateFilmGenre = () => getRandomRangeFromArray(genres);

const generateFilmPoster = () => posters[getRandomInteger(0, posters.length - 1)];

const generateFilmDescription = () => {
  const descriptions = descriptionText.split('. ').map((i) => i.replace(/\.*$/,'.'));

  return getRandomRangeFromArray(descriptions).join(' ');
};

const generateWatchingDate = () => {
  const date = dayjs().toDate();

  return dayjs(date).format('YYYY/MM/DD');
};

export const generateFilm = () => ({
  id: generateId(),
  comments: [...new Set(Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, () => getRandomInteger(MIN_RANGE, MAX_RANGE)))],
  filmInfo: {
    title: generateFilmTitle(),
    alternativeTitle: generateFilmTitle(),
    totalRating: generateFilmRating(),
    poster: generateFilmPoster(),
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: generateFilmYear(),
      releaseCountry: 'Finland'
    },
    runtime: generateFilmDuration(),
    genre: generateFilmGenre(),
    description: generateFilmDescription()
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched:Boolean(getRandomInteger(0, 1)),
    watchingDate: generateWatchingDate(),
    favorite: Boolean(getRandomInteger(0, 1))
  }
});

