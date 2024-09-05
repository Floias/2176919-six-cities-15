import { createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { NameSpace } from '../../utils/constants';
import { FavoritesSlice } from '../../types/state';
import { fetchFavoriteOffers, favoriteAction } from '../api-actions';
import { RequestStatus } from '../../utils/constants';
import { togglesFavorite } from '../../utils/toggle-favorite';

const initialState: FavoritesSlice = {
  offersFavorite: [],
  status: RequestStatus.Idle,
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    dropFavorite: (state) => {
      state.offersFavorite = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.offersFavorite = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.status = RequestStatus.Error;
        toast.error('Favorite offers are temporarily unavailable');
      })
      .addCase(favoriteAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(favoriteAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        togglesFavorite(state, action.payload);
      })
      .addCase(favoriteAction.rejected, (state) => {
        state.status = RequestStatus.Error;
        toast.error('Failed to add to favorites');
      });
  }
});

export const {dropFavorite} = favoritesSlice.actions;
