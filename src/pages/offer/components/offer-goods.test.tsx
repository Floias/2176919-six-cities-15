import { render, screen } from '@testing-library/react';
import OfferGoods from './offer-goods';

describe('Component: OfferGoods', () => {
  it('should render correct', () => {
    const mockGood = 'mockGoods';
    const expectedText = /mockGoods/i;

    render(<OfferGoods good={mockGood}/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
