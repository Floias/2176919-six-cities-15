import { UserSlice } from '../../types/state';
import { AuthorizationStatus, RequestStatus } from '../../utils/constants';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userSlice } from './user';
import { makeFakeUser } from '../../utils/mocks-test';

describe ('userSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: UserSlice = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.Auth,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: UserSlice = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" and User with "checkAuthAction.fulfilled" action', () => {
    const mockUser = makeFakeUser();
    const initialState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      user: mockUser,
      authorizationStatus: AuthorizationStatus.Auth,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = userSlice.reducer(initialState, checkAuthAction.fulfilled(mockUser, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.Auth,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.NoAuth,
      loginLoadingStatus: RequestStatus.Idle,
    };

    const result = userSlice.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set loginLoadingStatus with "loginAction.pending" action', () => {
    const initialState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Loading,
    };

    const result = userSlice.reducer(initialState, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set state with "loginAction.fulfilled" action', () => {
    const mockUser = makeFakeUser();
    const initialState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      user: mockUser,
      authorizationStatus: AuthorizationStatus.Auth,
      loginLoadingStatus: RequestStatus.Success,
    };

    const result = userSlice.reducer(initialState, loginAction.fulfilled(mockUser, '',{login: mockUser.email, password: ''}));

    expect(result).toEqual(expectedState);
  });

  it('should set state with "loginAction.rejected" action', () => {
    const initialState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoadingStatus: RequestStatus.Idle,
    };
    const expectedState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.NoAuth,
      loginLoadingStatus: RequestStatus.Error,
    };

    const result = userSlice.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" and noUser with "logoutAction.fulfilled" action', () => {
    const mockUser = makeFakeUser();
    const initialState = {
      user: mockUser,
      authorizationStatus: AuthorizationStatus.Auth,
      loginLoadingStatus: RequestStatus.Success,
    };
    const expectedState = {
      user: {email: '', avatarUrl: ''},
      authorizationStatus: AuthorizationStatus.NoAuth,
      loginLoadingStatus: RequestStatus.Success,
    };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
