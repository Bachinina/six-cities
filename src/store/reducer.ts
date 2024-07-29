// reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITIES } from '../constants/constants';
import { loadOffers, selectCity, setOffersLoadingStatus, requireAuthorization, setUserEmail } from './action';
import { ServerOffer } from '../types/offer';

type InitialStateType = {
  city: string;
  offers: ServerOffer[];
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
};

const initialState: InitialStateType = {
  city: CITIES[0].slug,
  offers: [],
  isOffersDataLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    });
});
