import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeFavoriteOffer } from '../utils/mocks-test';
import { State } from '../types/state';
import { APIRoute, FavoriteStatus } from '../utils/constants';
import { checkAuthAction, fetchOffersAction, loginAction, logoutAction, fetchSelectOffer, fetchOffersNearby, fetchReviews, reviewAction, fetchFavoriteOffers, favoriteAction } from './api-actions';
import { makeFakeUser, makeFakeOfferData, makeFakeOffer, makeFakeOfferNearby, makeFakeReview, makeFakeFavoriteOfferWithFlag } from '../utils/mocks-test';

describe('Acync actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ Offers: { offers: [] }});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      const mockUser = makeFakeUser();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUser);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeOfferData()];
      mockAxiosAdapter.onGet(APIRoute.Offers). reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers). reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    const mockUser = makeFakeUser();
    const fakeUserData = { login: mockUser.email, password: '1254' };
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" with thunk "loginAction" when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(loginAction(fakeUserData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(fakeUserData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });
  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchSelectOffer', () => {
    const mockOffer = makeFakeOffer();
    it('should dispatch "fetchSelectOffer.pending", "fetchSelectOffer.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(200, mockOffer);

      await store.dispatch(fetchSelectOffer({offerId: mockOffer.id}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSelectOffer.pending.type,
        fetchSelectOffer.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchSelectOffer.pending", "fetchSelectOffer.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(400);

      await store.dispatch(fetchSelectOffer({offerId: mockOffer.id}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSelectOffer.pending.type,
        fetchSelectOffer.rejected.type,
      ]);
    });
  });

  describe('fetchOffersNearby', () => {
    const mockOffer = makeFakeOffer();
    it('should dispatch "fetchOffersNearby.pending", "fetchOffersNearby.fulfilled" when server response 200', async () => {
      const mockOffersNearby = makeFakeOfferNearby();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}${APIRoute.OffersNearby}`).reply(200, mockOffersNearby);

      await store.dispatch(fetchOffersNearby({offerId: mockOffer.id}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersNearby.pending.type,
        fetchOffersNearby.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchOffersNearby.pending", "fetchOffersNearby.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}${APIRoute.OffersNearby}`).reply(400);

      await store.dispatch(fetchOffersNearby({offerId: mockOffer.id}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersNearby.pending.type,
        fetchOffersNearby.rejected.type,
      ]);
    });
  });

  describe('fetchReviews', () => {
    const mockOffer = makeFakeOffer();
    it('should dispatch "fetchReviews.pending", "fetchReviews.fulfilled" when server response 200', async () => {
      const mockReviews = [makeFakeReview()];
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${mockOffer.id}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews({offerId: mockOffer.id}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchReviews.pending", "fetchReviews.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${mockOffer.id}`).reply(400);

      await store.dispatch(fetchReviews({offerId: mockOffer.id}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('reviewAction', () => {
    const mockReview = makeFakeReview();
    it('should dispatch "reviewAction.pending", "reviewAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${mockReview.id}`, {comment: mockReview.comment, rating: mockReview.rating}).reply(200, mockReview);

      await store.dispatch(reviewAction({offerId: mockReview.id, comment: mockReview.comment, rating: mockReview.rating}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        reviewAction.pending.type,
        reviewAction.fulfilled.type,
      ]);
    });

    it('should dispatch "reviewAction.pending", "reviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${mockReview.id}`, {comment: mockReview.comment, rating: mockReview.rating}).reply(400);

      await store.dispatch(reviewAction({offerId: mockReview.id, comment: mockReview.comment, rating: mockReview.rating}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        reviewAction.pending.type,
        reviewAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteOffers', () => {
    it('should dispatch "fetchFavoriteOffers.pending", "fetchFavoriteOffers.fulfilled" when server response 200', async () => {
      const mockFavoriteOffers = [makeFakeOfferData()];
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, mockFavoriteOffers);

      await store.dispatch(fetchFavoriteOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFavoriteOffers.pending", "fetchFavoriteOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400);

      await store.dispatch(fetchFavoriteOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.rejected.type,
      ]);
    });
  });

  describe('favoriteAction', () => {
    it('should dispatch "favoriteAction.pending", "favoriteAction.fulfilled" when server response 200 and isFavorite - true', async () => {
      const mockFavoriteOffer = makeFakeFavoriteOffer(true);
      const mockFavoriteOfferDetailed = makeFakeFavoriteOfferWithFlag(mockFavoriteOffer, true);
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockFavoriteOffer.id}/${FavoriteStatus.Extract}`).reply(200, mockFavoriteOfferDetailed);

      await store.dispatch(favoriteAction({offerId: mockFavoriteOffer.id, isFavorite: FavoriteStatus.Extract}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        favoriteAction.pending.type,
        favoriteAction.fulfilled.type,
      ]);
    });

    it('should dispatch "favoriteAction.pending", "favoriteAction.fulfilled" when server response 200 and isFavorite - false', async () => {
      const mockFavoriteOffer = makeFakeFavoriteOffer();
      const mockFavoriteOfferDetailed = makeFakeFavoriteOfferWithFlag(mockFavoriteOffer, false);
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockFavoriteOffer.id}/${FavoriteStatus.Add}`).reply(200, mockFavoriteOfferDetailed);

      await store.dispatch(favoriteAction({offerId: mockFavoriteOffer.id, isFavorite: FavoriteStatus.Add}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        favoriteAction.pending.type,
        favoriteAction.fulfilled.type,
      ]);
    });

    it('should dispatch "favoriteAction.pending", "favoriteAction.rejected" when server response 400', async () => {
      const mockFavoriteOffer = makeFakeFavoriteOffer();
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockFavoriteOffer.id}/${FavoriteStatus.Add}`).reply(400);

      await store.dispatch(favoriteAction({offerId: mockFavoriteOffer.id, isFavorite: FavoriteStatus.Add}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        favoriteAction.pending.type,
        favoriteAction.rejected.type,
      ]);
    });
  });
});
