import {cardType} from './type-card-container';

export const CARDS: cardType[] = [
  {type: 'Email', other: 'other1', prova: [{'mail': 'Libero', 'mail2': 'Gmail'}], id: 1,},
  {type: 'Business', other: 'other2', prova: [{'business': 'Udacity', 'business2': 'Trello'}], id: 2},
  {type: 'Education', other: 'other3', prova: [{'education': 'Coursera', 'education2': 'Udemy'}], id: 3},
  {type: 'Games', other: 'other4', prova: [{'games': 'Hearthstone', 'games2': 'Fifa2018'}], id: 4},
  {type: 'Entertainment', other: 'other5', prova: [{'entertainment': 'Netflix', 'entertainment2': 'Sky'}], id: 5},
  {type: 'Shopping', other: 'other6', prova: [{'shopping': 'Amazon', 'shopping2': 'Apple'}], id: 6},
  {type: 'Social', other: 'other7', prova: [{'social': 'Facebook', 'ciao': 'Instagram'}], id: 7},
];
