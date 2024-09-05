import { render, screen } from '@testing-library/react';
import { makeFakeStore, makeFakeOffer } from '../../utils/mocks-test.ts';
import { withRouter, withStore } from '../../utils/mock-component.tsx';
import Location from './location.tsx';

describe('Component: Location', () => {
  it('should render correct', () => {
    const expectedCount = 1;

    const citiesItemTestId = 'cities-list-item';
    const { city } = makeFakeOffer();
    const withRouterComponent = withRouter(<Location city={ city.name } isTabs = {false}/>);
    const { withStoreComponent } = withStore(withRouterComponent, makeFakeStore());

    render(withStoreComponent);

    const citiesItems = screen.getAllByTestId(citiesItemTestId);

    expect(citiesItems.length).toBe(expectedCount);
  });
});
