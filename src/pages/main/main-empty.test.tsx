import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correct', () => {
    const expectedText = /No places to stay available/i;
    const mockCity = 'Paris';

    render(<MainEmpty city={mockCity}/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
