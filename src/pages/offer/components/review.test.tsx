import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../../utils/mocks-test';
import Review from './review';

describe('Component: Review', () => {
  it('should render correct', () => {
    const mockReview = makeFakeReview();
    const expectedComment = mockReview.comment;
    const expectedUserName = mockReview.user.name;

    render(<Review review={mockReview}/>);

    expect(screen.getByText(expectedComment)).toBeInTheDocument();
    expect(screen.getByText(expectedUserName)).toBeInTheDocument();
  });
});
