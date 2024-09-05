import { createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { NameSpace } from '../../utils/constants';
import { OfferSlice } from '../../types/state';
import { fetchSelectOffer, fetchOffersNearby, fetchReviews, reviewAction } from '../api-actions';
import { RequestStatus } from '../../utils/constants';

const initialState: OfferSlice = {
  offer: null,
  offersNearby: [],
  reviews: [],
  status: RequestStatus.Idle,
  reviewSendingStatus: RequestStatus.Idle,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    dropOffer: (state) => {
      state.offer = null;
      state.offersNearby = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSelectOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchSelectOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchSelectOffer.rejected, (state) => {
        state.status = RequestStatus.Error;
        toast.error('The selected offer is temporarily unavailable');
      })
      .addCase(fetchOffersNearby.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.status = RequestStatus.Error;
        toast.error('Could not get offers nearby');
      })
      .addCase(fetchReviews.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = RequestStatus.Error;
        toast.error('Failed to get reviews');
      })
      .addCase(reviewAction.pending, (state) => {
        state.reviewSendingStatus = RequestStatus.Loading;
      })
      .addCase(reviewAction.fulfilled, (state, action) => {
        state.reviewSendingStatus = RequestStatus.Success;
        state.reviews.push(action.payload);
      })
      .addCase(reviewAction.rejected, (state) => {
        state.reviewSendingStatus = RequestStatus.Error;
        toast.error('Something go wrong when trying to send your review');
      });
  }
});

export const {dropOffer} = offerSlice.actions;
