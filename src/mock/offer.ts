import { faker } from '@faker-js/faker';

import type { ServerOffer, ServerCity, ServerLocation } from '../types/offer';

import { CITIES, OFFER_TYPES } from '../constants/constants';

const mockLocation = (): ServerLocation => ({
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  zoom: faker.number.int({ min: 1, max: 10 })
});

const mockCity = (): ServerCity => ({
  name: faker.helpers.arrayElement(CITIES).name,
  location: mockLocation()
});

export const mockGetOffersAmount = (): number => faker.number.int({ min: 1, max: 7 });

export const mockOffer = (): ServerOffer => ({
  id: faker.string.uuid(),
  title: faker.location.streetAddress(false),
  type: faker.helpers.arrayElement(OFFER_TYPES),
  price: faker.number.int({ min: 10, max: 1000 }),
  city: mockCity(),
  location: mockLocation(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.number.int({ min: 0, max: 5 }),
  previewImage: faker.image.urlLoremFlickr({ width: 260, height: 200, category: 'apartment' }),
});
