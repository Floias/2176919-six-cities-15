import {internet, image, address, name, lorem, datatype} from 'faker';
import { nanoid } from 'nanoid';
import { getRandomInteger } from './random-city';
import { OfferDetailed } from '../types/offer';
import { OfferData } from '../types/offers';
import { FavoriteOffer } from '../types/favorite-offer';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { AuthorizationStatus, RequestStatus } from './constants';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeUser = () => ({email: internet.email(), avatarUrl: image.avatar()});

export const makeFakeOffer = (): OfferDetailed => ({
  id: nanoid(),
  title: address.cityName(),
  type: address.streetName(),
  price: getRandomInteger(1800, 7000),
  city: {
    name: address.cityName(),
    location: {
      latitude: getRandomInteger(28, 29),
      longitude: getRandomInteger(46, 48),
      zoom: getRandomInteger(10, 16),
    },
  },
  location: {
    latitude: getRandomInteger(28, 29),
    longitude: getRandomInteger(46, 48),
    zoom: getRandomInteger(10, 16),
  },
  isFavorite: false,
  isPremium: false,
  rating: getRandomInteger(1, 5),
  description: address.direction(),
  bedrooms: getRandomInteger(1, 5),
  goods: [lorem.word()],
  host: {
    name: name.firstName(),
    avatarUrl: image.avatar(),
    isPro: false,
  },
  images: [image.imageUrl()],
  maxAdults: getRandomInteger(1, 5),
});

export const makeFakeOfferNearby = () => ({
  id: nanoid(),
  title: address.cityName(),
  type: address.streetName(),
  price: getRandomInteger(1800, 7000),
  city: {
    name: address.cityName(),
    location: {
      latitude: getRandomInteger(28, 29),
      longitude: getRandomInteger(46, 48),
      zoom: getRandomInteger(10, 16),
    },
  },
  location: {
    latitude: getRandomInteger(28, 29),
    longitude: getRandomInteger(46, 48),
    zoom: getRandomInteger(10, 16),
  },
  isFavorite: false,
  isPremium: false,
  rating: getRandomInteger(1, 5),
  previewImage: image.imageUrl(),
});

export const makeFakeReview = () => ({
  id: nanoid(),
  date: datatype.string(),
  user: {
    name: name.findName(),
    avatarUrl: image.avatar(),
    isPro: false,
  },
  comment: lorem.text(),
  rating: getRandomInteger(1, 5),
});

export const makeFakeOfferData = (): OfferData => ({
  id: nanoid(),
  title: address.cityName(),
  type: address.streetName(),
  price: getRandomInteger(1800, 7000),
  city: {
    name: address.cityName(),
    location: {
      latitude: getRandomInteger(28, 29),
      longitude: getRandomInteger(46, 48),
      zoom: getRandomInteger(10, 16),
    },
  },
  location: {
    latitude: getRandomInteger(28, 29),
    longitude: getRandomInteger(46, 48),
    zoom: getRandomInteger(10, 16),
  },
  isFavorite: false,
  isPremium: false,
  rating: getRandomInteger(1, 5),
  previewImage: image.imageUrl(),
});

export const makeFakeFavoriteOffer = (flag = false) => ({
  id: nanoid(),
  title: address.cityName(),
  type: address.streetName(),
  price: getRandomInteger(1800, 7000),
  previewImage: image.imageUrl(),
  city: {
    name: address.cityName(),
    location: {
      latitude: getRandomInteger(28, 29),
      longitude: getRandomInteger(46, 48),
      zoom: getRandomInteger(10, 16),
    },
  },
  location: {
    latitude: getRandomInteger(28, 29),
    longitude: getRandomInteger(46, 48),
    zoom: getRandomInteger(10, 16),
  },
  isFavorite: flag,
  isPremium: false,
  rating: getRandomInteger(1, 5),
});

export const makeFakeFavoriteOfferWithFlag = (offer: FavoriteOffer, flag: boolean) => ({
  id: offer.id,
  title: offer.title,
  description: lorem.text(),
  type: offer.type,
  price: offer.price,
  previewImage: offer.previewImage,
  images: [image.imageUrl()],
  city: {
    name: offer.city.name,
    location: {
      latitude: offer.city.location.latitude,
      longitude: offer.city.location.longitude,
      zoom: offer.city.location.zoom,
    },
  },
  location: {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    zoom: offer.location.zoom,
  },
  goods: [lorem.word()],
  host: {
    name: name.firstName(),
    avatarUrl: image.avatar(),
    isPro: false,
  },
  isFavorite: flag,
  isPremium: offer.isPremium,
  rating: offer.rating,
  bedrooms: getRandomInteger(1, 5),
  maxAdults: getRandomInteger(1, 5),
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  User: {
    user: {email: '', avatarUrl: ''},
    authorizationStatus: AuthorizationStatus.Auth,
    loginLoadingStatus: RequestStatus.Idle,
  },
  Offers: {
    city: 'Paris',
    sorting: 'Popular',
    offers: [],
    offersLoadingStatus: RequestStatus.Idle,
  },
  Offer: {
    offer: null,
    offersNearby: [],
    reviews: [],
    status: RequestStatus.Idle,
    reviewSendingStatus: RequestStatus.Idle,
  },
  Favorites: {
    offersFavorite: [],
    status: RequestStatus.Idle,
  },
  ...initialState ?? {},
});
