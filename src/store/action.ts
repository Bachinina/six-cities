import { createAction } from '@reduxjs/toolkit';
import { ServerOffer } from '../types/offer';
import { AuthorizationStatus } from '../constants/constants';


export const selectCity = createAction('selectCity', (city: string) => ({ payload: city }));
export const loadOffers = createAction<ServerOffer[]>('data/loadOffers');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('auth/requireAuthorization');
export const setUserEmail = createAction('auth/setUserEmail', (data: string) => ({ payload: data }));
