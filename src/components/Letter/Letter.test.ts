import { render } from '@testing-library/svelte';

import Letter from './Letter.svelte';

describe('<Letter />', () => {
  it('renders a non-alphanumeric letter', () => {
    const letter = 'F';
    const { getAllByText } = render(Letter, { letter });

    expect(getAllByText(letter)[0]).toBeInTheDocument();
  });

  describe('result', () => {
    it("renders with 'correct' class if the status is equal correct", () => {
      const letter = 'F';
      const status = 'correct';
      const { getAllByText } = render(Letter, { letter, status });

      expect(getAllByText(letter)[1]).toHaveClass(status);
    });

    it("renders with 'misplaced' class if the status is equal misplaced", () => {
      const letter = 'F';
      const status = 'misplaced';
      const { getAllByText } = render(Letter, { letter, status });

      expect(getAllByText(letter)[1]).toHaveClass(status);
    });

    it("renders with 'incorrect' class if the status is equal incorrect", () => {
      const letter = 'F';
      const status = 'incorrect';
      const { getAllByText } = render(Letter, { letter, status });

      expect(getAllByText(letter)[1]).toHaveClass(status);
    });
  });
});
