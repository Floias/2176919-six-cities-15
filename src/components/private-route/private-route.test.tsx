import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../utils/constants';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks-test';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';

describe ('Component: PrivateRoute', () => {
  const expectedText = 'public route';
  const notExpectedText = 'private route';
  let mockPath: AppRoute;
  beforeEach(() => {
    mockPath = AppRoute.Favorites;
  });
  it('should render component for public route, when user not authorized', () => {
    const withRouterComponent = withRouter(
      <Routes>
        <Route path={ AppRoute.Login } element={ <span>{ expectedText }</span> } />
        <Route path={ AppRoute.Favorites } element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{ notExpectedText }</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockPath
    );

    const { withStoreComponent } = withStore(withRouterComponent, makeFakeStore(
      {
        User: {
          user: {email: '', avatarUrl: ''},
          authorizationStatus: AuthorizationStatus.NoAuth,
          loginLoadingStatus: RequestStatus.Idle
        }
      }
    ));
    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
  it('should render component for private route, when user authorized', () => {
    const withRouterComponent = withRouter(
      <Routes>
        <Route path={ AppRoute.Login } element={ <span>{ notExpectedText }</span> } />
        <Route path={ AppRoute.Favorites } element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <span>{ expectedText }</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockPath
    );
    const { withStoreComponent } = withStore(withRouterComponent, makeFakeStore(
      {
        User: {
          user: {email: '', avatarUrl: ''},
          authorizationStatus: AuthorizationStatus.Auth,
          loginLoadingStatus: RequestStatus.Success
        }
      }
    ));
    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
