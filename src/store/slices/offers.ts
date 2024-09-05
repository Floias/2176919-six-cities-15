import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { NameSpace } from '../../utils/constants';
import { OffersSlice } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { RequestStatus } from '../../utils/constants';
import { City } from '../../utils/cities';
import { Sorting } from '../../utils/sorting-types';

const initialState: OffersSlice = {
  city: 'Paris',
  sorting: 'Popular',
  offers: [],
  offersLoadingStatus: RequestStatus.Idle,
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
        toast.error('Receiving offers is temporarily unavailable');
      });
  }
});

export const {setCity, setSorting} = offersSlice.actions;
