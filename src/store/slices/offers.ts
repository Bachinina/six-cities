import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types/offer';
import { CITIES, CityName } from '../../constants/constants';


type OffersState = {
  city: CityName;
  offers: ServerOffer[];
}

const initialState: OffersState = {
  city: CITIES[0].name,
  offers: []
};

const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    }
  }
});

const offersActions = offerSlice.actions;

export {offersActions, offerSlice};
