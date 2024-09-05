import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ReactElement } from 'react';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch } from './mocks-test';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { InitialEntry } from 'history';


type ComponentWithMockStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withRouter(component: JSX.Element, propsMemory?: InitialEntry) {
  if(propsMemory) {
    return (
      <MemoryRouter initialEntries={[propsMemory]}>
        <HelmetProvider>
          {component}
        </HelmetProvider>
      </MemoryRouter>
    );
  }
  return (
    <MemoryRouter>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </MemoryRouter>
  );
}

export function withStore(
  component: ReactElement,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [ thunk.withExtraArgument(axios) ];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={ mockStore }>{ component }</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
