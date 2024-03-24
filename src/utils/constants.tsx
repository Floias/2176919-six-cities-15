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

enum SortType {
  Popular = 'Popular',
  PriceAscending = 'Price: low to high',
  PriceDescending = 'Price: high to low',
  RatingDescending = 'Top rated first',
}

enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  OffersNearby = '/nearby',
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

export {AppRoute, AuthorizationStatus, RequestStatus, SortType, APIRoute, NameSpace, PlaceCardSize};
