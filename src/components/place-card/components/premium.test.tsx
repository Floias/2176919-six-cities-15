import { render, screen } from '@testing-library/react';
import Premium from './premium';

describe('Component: Premium', () => {
  it('should render correct', () => {
    const expectedText = /Premium/i;

    render(<Premium />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
