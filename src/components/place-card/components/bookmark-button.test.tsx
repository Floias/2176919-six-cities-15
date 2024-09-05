import { render, screen } from '@testing-library/react';
import BookmarkButton from './bookmark-button';

describe('Component: BookmarkButton', () => {
  it('should render correct', () => {
    const expectedIsFavorite = false;
    const bookmarkButtonByRole = 'button';
    const onChangeMock = vi.fn();

    render(<BookmarkButton isFavorite={expectedIsFavorite} onChange={onChangeMock} />);

    const bookmarkButton = screen.getByRole(bookmarkButtonByRole);

    expect(bookmarkButton).toBeInTheDocument();
  });
});
