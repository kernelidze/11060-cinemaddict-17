import dayjs from 'dayjs';
import {getRandomInteger} from 'Utils';

const MAX_HOUR_GAP = 100000;
let currentId = 0;

const emojis = [
  'angry',
  'puke',
  'smile',
  'sleeping',
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

const generateId = () => {
  currentId++;

  return currentId - 1;
};

const generateCommentAuthor = () => commentaryAuthor[getRandomInteger(0, commentaryAuthor.length - 1)];

const generateCommentText = () => commentaryText[getRandomInteger(0, commentaryText.length - 1)];

const generateCommentEmoji = () => emojis[getRandomInteger(0, emojis.length - 1)];

const generateCommentDate = () => {
  const hourGap = getRandomInteger(-MAX_HOUR_GAP, 0);
  const date = dayjs().add(hourGap, 'second').toDate();
  return dayjs(date).format('YYYY/MM/DD HH:mm:ss');
};

export const generateComment = () => ({
  id: generateId(),
  author: generateCommentAuthor(),
  comment: generateCommentText(),
  date: generateCommentDate(),
  emotion: generateCommentEmoji(),
});

