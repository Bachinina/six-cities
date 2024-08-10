import { City } from '../types/offer';

export const APP_NAME = '6 cities';

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer/:id',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  NoAuth,
  Auth,
  Unknown
}

export const CITIES: City[] = [
  { name: 'Paris', slug: 'paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 } },
  { name: 'Cologne', slug: 'cologne', location: { latitude: 50.9375, longitude: 6.9603, zoom: 13 } },
  { name: 'Brussels', slug: 'brussels', location: { latitude: 50.8503, longitude: 4.3517, zoom: 13 } },
  { name: 'Amsterdam', slug: 'amsterdam', location: { latitude: 52.37022, longitude: 4.89517, zoom: 13 } },
  { name: 'Hamburg', slug: 'hamburg', location: { latitude: 53.5511, longitude: 9.9937, zoom: 13 } },
  { name: 'Dusseldorf', slug: 'dusseldorf', location: { latitude: 51.2277, longitude: 6.7735, zoom: 13 } }
] as const;

export type CityName = City['name'];


export const OFFER_TYPES = [
  'Apartment',
  'Room',
  'House',
  'Hotel'
] as const;


export const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-low-to-high', label: 'Price: low to high' },
  { value: 'price-high-to-low', label: 'Price: high to low' },
  { value: 'top-rated-first', label: 'Top rated first' },
];
