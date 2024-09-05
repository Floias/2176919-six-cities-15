import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import NotFound from './not-found';

describe('Component: NotFound', () => {
  it('should render correct', () => {
    const expectedText = /The page you are looking for can not be found/i;
    const expectedLinkText = 'Go to home page';

    render(withRouter(<NotFound />));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
