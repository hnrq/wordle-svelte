import { render } from '@testing-library/svelte';

import Word from './Word.svelte';

describe('<Word />', () => {
  it('renders 5 letters', () => {
    const word = 'THROW';
    const { getByText } = render(Word, { word });

    word.split('').forEach(letter => {
      expect(getByText(letter)).toBeInTheDocument();
    });
  });

  it('renders the result for each letter if submitted equals true', () => {
    const word = 'THROW';
    const { getByText } = render(Word, { word, submitted: true });

    word.split('').forEach(letter => {
      expect(getByText(letter).parentElement).toHaveClass('show-result');
    });
  });
});
