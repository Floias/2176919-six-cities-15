enum AppRoute {
  Root='/',
  Login='/login',
  Favorites='/favorites',
  Offer='/offer/:id',
}

enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

enum FavoriteStatus {
  Add = '1',
  Extract = '0',
}

enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  OffersNearby = '/nearby',
  Favorites = '/favorite',
}

enum NameSpace {
  Offers = 'Offers',
  Offer = 'Offer',
  NearPlaces = 'NearPlaces',
  Favorites = 'Favorites',
  Reviews = 'Reviews',
  User = 'User',
}

enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

enum PlaceCardVariant {
 Vertical = 'vertical',
 Horizontal = 'horizontal',
}

const PlaceCardSize = {
  PlaceCard: {
    with: '260',
    height: '200',
  },
  PlaceCardSmall: {
    with: '150',
    height: '110',
  }
};

export {AppRoute, PlaceCardVariant, AuthorizationStatus, FavoriteStatus, RequestStatus, APIRoute, NameSpace, PlaceCardSize};
