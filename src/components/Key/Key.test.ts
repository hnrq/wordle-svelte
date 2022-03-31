import { render, fireEvent } from '@testing-library/svelte';

import Key from './Key.svelte';

describe('<Key />', () => {
  it('renders a letter', () => {
    const letter = 'l';
    const { getByText } = render(Key, { letter });

    expect(getByText(letter)).toBeInTheDocument();
  });

  it('calls onClick when clicking the key, passing the letter as argument', () => {
    const mockOnClick = jest.fn();
    const letter = 'l';
    const { getByText } = render(Key, { letter, onClick: mockOnClick });

    fireEvent.click(getByText(letter));
    expect(mockOnClick).toHaveBeenCalledWith(letter);
  });
});
