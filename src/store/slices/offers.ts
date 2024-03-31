import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../utils/constants';
import { OffersSlice } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { RequestStatus } from '../../utils/constants';
import { City } from '../../components/cities-list/cities-list';
import { Sorting } from '../../pages/main/components/places-options';

const initialState: OffersSlice = {
  city: 'Paris',
  sorting: 'Popular',
  offers: [],
  offersLoadingStatus: RequestStatus.Idle,
  error: null,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSorting: (state, action: PayloadAction<Sorting>) => {
      state.sorting = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoadingStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = RequestStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersLoadingStatus = RequestStatus.Error;
        state.error = 'Error receiving offers';
      });
  }
});

export const {setCity, setSorting} = offersSlice.actions;
