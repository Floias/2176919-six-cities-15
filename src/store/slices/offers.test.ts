import { offersSlice, setCity, setSorting } from './offers';
import { RequestStatus } from '../../utils/constants';
import { OffersSlice } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { makeFakeOfferData } from '../../utils/mocks-test';

describe ('offersSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: OffersSlice = {
      city: 'Paris',
      sorting: 'Popular',
      offers: [],
      offersLoadingStatus: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: OffersSlice = {
      city: 'Paris',
      sorting: 'Popular',
      offers: [],
      offersLoadingStatus: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "offersLoadingStatus" to "Loading" with "fetchOffersAction.pending"', () => {
    const expectedState: OffersSlice = {
      city: 'Paris',
      sorting: 'Popular',
      offers: [],
      offersLoadingStatus: RequestStatus.Loading,
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to offers, "offersLoadingStatus" to Success with "fetchOffersAction.fulfilled"', () => {
    const mockOffer = makeFakeOfferData();
    const expectedState: OffersSlice = {
      city: 'Paris',
      sorting: 'Popular',
      offers: [mockOffer],
      offersLoadingStatus: RequestStatus.Success,
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.fulfilled([mockOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "offersLoadingStatus" to Error with "offersLoadingStatus.rejected"', () => {
    const expectedState: OffersSlice = {
      city: 'Paris',
      sorting: 'Popular',
      offers: [],
      offersLoadingStatus: RequestStatus.Error,
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set city with "setCity" action', () => {
    const initialState: OffersSlice = {
      city: 'Paris',
      sorting: 'Popular',
      offers: [],
      offersLoadingStatus: RequestStatus.Idle,
    };

    const expectedState: OffersSlice = {
      city: 'any city',
      sorting: 'Popular',
      offers: [],
      offersLoadingStatus: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(initialState, setCity('any city'));

    expect(result).toEqual(expectedState);
  });

  it('should set sorting with "setSorting" action', () => {
    const initialState: OffersSlice = {
      city: 'Paris',
      sorting: 'Popular',
      offers: [],
      offersLoadingStatus: RequestStatus.Idle,
    };

    const expectedState: OffersSlice = {
      city: 'Paris',
      sorting: 'Price: low to high',
      offers: [],
      offersLoadingStatus: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(initialState, setSorting('Price: low to high'));

    expect(result).toEqual(expectedState);
  });
});
