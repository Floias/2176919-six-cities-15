import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correct', () => {
    const expectedAltText = '6 cities logo';

    render(withRouter(<Footer />));

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
