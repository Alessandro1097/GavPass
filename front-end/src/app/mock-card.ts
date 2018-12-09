import {cardType} from './type-card-container';

export const CARDS: cardType[] = [
  {type: 'Email', attributes: ['Libero', 'Gmail'], id: 1, url: ['http://www.libero.it', 'http://www.gmail.com']},
  {type: 'Business', attributes: ['Trenitalia', 'Trello'], id: 2, url: ['http://www.trenitalia.com', 'https://trello.com']},
  {type: 'Education', attributes: ['Coursera', 'Udemy'], id: 3, url: ['https://www.coursera.org', 'https://www.udemy.com']},
  {type: 'Games', attributes: ['Hearthstone', 'Fifa'], id: 4, url: ['https://playhearthstone.com', 'https://www.fifa.com']},
  {type: 'Entertainment', attributes: ['Netflix', 'Youtube'], id: 5, url: ['https://www.netflix.com', 'https://www.youtube.com']},
  {type: 'Shopping', attributes: ['Zalando', 'Amazon'], id: 6, url: ['https://www.zalando.it', 'https://www.amazon.it']},
  {type: 'Social', attributes: ['Facebook', 'Instagram'], id: 7, url: ['https://it-it.facebook.com', 'https://www.instagram.com']},
];
