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
const MAX_HOUR_GAP = 100000;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 6;
const MIN_COMMENTS_DATE = 10;
const MAX_COMMENTS_DATE = 50;

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

const emojis = [
  'angry.png',
  'puke.png',
  'smile.png',
  'sleeping.png',
];

const commentaryText = [
  'Best!',
  'Terrible!',
  'Awesome!',
  'Ugly!'
];

const commentaryAuthor = [
  'John',
  'Elly',
  'Mary',
  'Jane',
  'Keanu'
];

const generateFilmTitle = () => {
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateFilmRating = () => {
  const filmRating = getRandomFraction(MIN_RATING, MAX_RATING, DECIMAL_RATING);

  return filmRating;
};

const generateFilmYear = () => {
  const yearsGap = getRandomInteger(-MAX_YEAR_GAP, 0);

  return dayjs().add(yearsGap, 'year').toDate();
};

const generateFilmDuration = () => {
  const filmDuration = `${getRandomInteger(MIN_HOURS_DURATION, MAX_HOURS_DURATION)  }h ${  getRandomInteger(MIN_MINUTES_DURATION, MAX_MINUTES_DURATION)  }m`;

  return filmDuration;
};

const generateFilmGenre = () => {
  const randomGenres = getRandomRangeFromArray(genres);

  return randomGenres;
};

const generateFilmPoster = () => {
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateFilmDescription = () => {
  const descriptions = descriptionText.split('. ').map((i) => i.replace(/\.*$/,'.'));
  const filmDescription = getRandomRangeFromArray(descriptions).join(' ');

  return filmDescription;
};

const generateFilmCommentary = () => {
  const randomCommentaryCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const commentaryDate = [];
  const maxCommentsDateCount = getRandomInteger(MIN_COMMENTS_DATE, MAX_COMMENTS_DATE);

  for (let i = 0; i <= maxCommentsDateCount; i++) {
    const hourGap = getRandomInteger(-MAX_HOUR_GAP, 0);
    dayjs().add(hourGap, 'minute').toDate();
    const date = dayjs().add(hourGap, 'second').toDate();
    commentaryDate[i] = dayjs(date).format('YYYY/MM/DD HH:mm:ss');
    commentaryDate.push(commentaryDate[i]);
  }

  return {emojis, commentaryText, commentaryAuthor, commentaryDate, randomCommentaryCount};
};

export const generateFilm = () => ({
  description: generateFilmDescription(),
  title: generateFilmTitle(),
  rating: generateFilmRating(),
  poster: generateFilmPoster(),
  release: generateFilmYear(),
  duration: generateFilmDuration(),
  genre: generateFilmGenre(),
  comments: generateFilmCommentary(),
  watchlist: Boolean(getRandomInteger(0, 1)),
  alreadyWatched: Boolean(getRandomInteger(0, 1)),
  favorite: Boolean(getRandomInteger(0, 1)),
});
