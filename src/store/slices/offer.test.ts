import { offerSlice, dropOffer } from './offer';
import { RequestStatus } from '../../utils/constants';
import { fetchSelectOffer, fetchOffersNearby, fetchReviews, reviewAction } from '../api-actions';
import { makeFakeOffer, makeFakeOfferNearby, makeFakeReview } from '../../utils/mocks-test';

describe ('offerSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Idle,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Idle,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Loading" with "fetchSelectOffer.pending"', () => {
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Loading,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchSelectOffer.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to offer, "status" to Success with "fetchSelectOffer.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const expectedState = {
      offer: mockOffer,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Success,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchSelectOffer.fulfilled(mockOffer, '', { offerId: mockOffer.id }));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to Error with "fetchSelectOffer.rejected"', () => {
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Error,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchSelectOffer.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Loading" with "fetchOffersNearby.pending"', () => {
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Loading,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchOffersNearby.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offersNearby" to offers, "status" to Success with "fetchOffersNearby.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const mockOfferNearby = makeFakeOfferNearby();
    const expectedState = {
      offer: null,
      offersNearby: [mockOfferNearby],
      reviews: [],
      status: RequestStatus.Success,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchOffersNearby.fulfilled([mockOfferNearby], '', { offerId: mockOffer.id }));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to Error with "fetchOffersNearby.rejected"', () => {
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Error,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchOffersNearby.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Loading" with "fetchReviews.pending"', () => {
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Loading,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchReviews.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to reviews, "status" to Success with "fetchReviews.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const mockReview = makeFakeReview();
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [mockReview],
      status: RequestStatus.Success,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchReviews.fulfilled([mockReview], '', { offerId: mockOffer.id }));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to Error with "fetchReviews.rejected"', () => {
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Error,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, fetchReviews.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviewSendingStatus" to "Loading" with "reviewAction.pending"', () => {
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Idle,
      reviewSendingStatus: RequestStatus.Loading,
    };

    const result = offerSlice.reducer(undefined, reviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should adds a review to reviews, "reviewSendingStatus" to Success with "reviewAction.fulfilled"', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [mockReview],
      status: RequestStatus.Idle,
      reviewSendingStatus: RequestStatus.Success,
    };

    const result = offerSlice.reducer(undefined, reviewAction.fulfilled(mockReview, '', {
      offerId: mockReview.id,
      comment: mockReview.comment,
      rating: mockReview.rating,
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "reviewSendingStatus" to Error with "reviewAction.rejected"', () => {
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Idle,
      reviewSendingStatus: RequestStatus.Error,
    };

    const result = offerSlice.reducer(undefined, reviewAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should dropOffer with "dropOffer" action', () => {
    const mockOffer = makeFakeOffer();
    const mockOfferNearby = makeFakeOfferNearby();
    const initialState = {
      offer: mockOffer,
      offersNearby: [mockOfferNearby],
      reviews: [],
      status: RequestStatus.Idle,
      reviewSendingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      offer: null,
      offersNearby: [],
      reviews: [],
      status: RequestStatus.Idle,
      reviewSendingStatus: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(initialState, dropOffer);

    expect(result).toEqual(expectedState);
  });
});
