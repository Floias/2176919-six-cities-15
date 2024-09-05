import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component.tsx';
import CitiesList from './cities-list.tsx';
import { AppRoute } from '../../utils/constants.tsx';
import { makeFakeStore } from '../../utils/mocks-test.ts';

describe('Component: CitiesList', () => {

  let mockPath: AppRoute;
  beforeEach(() => {
    mockPath = AppRoute.Root;
  });
  it('should render correct', () => {
    const expectedCount = 6;
    const withRouterComponent = withRouter(
      <CitiesList
        isTabs = {false}
      />, mockPath);
    const { withStoreComponent } = withStore(withRouterComponent, makeFakeStore());

    render(withStoreComponent);
    const listItem = screen.getAllByTestId('cities-list-item');

    expect(listItem.length).toBe(expectedCount);
  });
});
