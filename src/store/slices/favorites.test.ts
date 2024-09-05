import { favoritesSlice, dropFavorite } from './favorites';
import { RequestStatus } from '../../utils/constants';
import { fetchFavoriteOffers, favoriteAction } from '../api-actions';
import { makeFakeFavoriteOffer, makeFakeFavoriteOfferWithFlag } from '../../utils/mocks-test';
import { FavoriteStatus } from '../../utils/constants';

describe ('FavoritesSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offersFavorite: [],
      status: RequestStatus.Idle,
    };

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offersFavorite: [],
      status: RequestStatus.Idle,
    };

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Loading" with "fetchFavoriteOffers.pending"', () => {
    const expectedState = {
      offersFavorite: [],
      status: RequestStatus.Loading,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoriteOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offersFavorite" to offersFavorite, "status" to Success with "fetchFavoriteOffers.fulfilled"', () => {
    const mockFavoriteOffer = makeFakeFavoriteOffer();
    const expectedState = {
      offersFavorite: [mockFavoriteOffer],
      status: RequestStatus.Success,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoriteOffers.fulfilled([mockFavoriteOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to Error with "fetchFavoriteOffers.rejected"', () => {
    const expectedState = {
      offersFavorite: [],
      status: RequestStatus.Error,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoriteOffers.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Loading" with "favoriteAction.pending"', () => {
    const expectedState = {
      offersFavorite: [],
      status: RequestStatus.Loading,
    };

    const result = favoritesSlice.reducer(undefined, favoriteAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should remove "offersFavorite" to offersFavorite, "status" to Success with "favoriteAction.fulfilled"', () => {
    const mockFavoriteOffer = makeFakeFavoriteOffer();
    const mockFavoriteOfferFalse = makeFakeFavoriteOfferWithFlag(mockFavoriteOffer, false);
    const initialState = {
      offersFavorite: [mockFavoriteOffer],
      status: RequestStatus.Idle,
    };
    const expectedState = {
      offersFavorite: [],
      status: RequestStatus.Success,
    };

    const result = favoritesSlice.reducer(initialState, favoriteAction.fulfilled(mockFavoriteOfferFalse, '', {
      offerId: mockFavoriteOffer.id,
      isFavorite: FavoriteStatus.Extract,
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "offersFavorite" to offersFavorite, "status" to Success with "favoriteAction.fulfilled"', () => {
    const mockFavoriteOffer = makeFakeFavoriteOffer(true);
    const mockFavoriteOfferFalse = makeFakeFavoriteOfferWithFlag(mockFavoriteOffer, true);
    const initialState = {
      offersFavorite: [],
      status: RequestStatus.Idle,
    };
    const expectedState = {
      offersFavorite: [mockFavoriteOffer],
      status: RequestStatus.Success,
    };

    const result = favoritesSlice.reducer(initialState, favoriteAction.fulfilled(mockFavoriteOfferFalse, '', {
      offerId: mockFavoriteOffer.id,
      isFavorite: FavoriteStatus.Add,
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to Error with "favoriteAction.rejected"', () => {
    const expectedState = {
      offersFavorite: [],
      status: RequestStatus.Error,
    };

    const result = favoritesSlice.reducer(undefined, favoriteAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should dropFavorite with "dropFavorite" action', () => {
    const mockFavoriteOffer = makeFakeFavoriteOffer(true);
    const initialState = {
      offersFavorite: [mockFavoriteOffer],
      status: RequestStatus.Success,
    };
    const expectedState = {
      offersFavorite: [],
      status: RequestStatus.Success,
    };

    const result = favoritesSlice.reducer(initialState, dropFavorite);

    expect(result).toEqual(expectedState);
  });
});
