import { render } from '@testing-library/svelte';

import Letter from './Letter.svelte';

describe('<Letter />', () => {
  it('renders a non-alphanumeric letter', () => {
    const letter = 'F';
    const { getAllByText } = render(Letter, { letter });

    expect(getAllByText(letter)[0]).toBeInTheDocument();
  });

  describe('result', () => {
    it("renders with 'green' class if the status is equal correct", () => {
      const letter = 'F';
      const status = 'correct';
      const { getAllByText } = render(Letter, { letter, status });

      expect(getAllByText(letter)[1]).toHaveClass('green');
    });

    it("renders with 'green' class if the status is equal present", () => {
      const letter = 'F';
      const status = 'present';
      const { getAllByText } = render(Letter, { letter, status });

      expect(getAllByText(letter)[1]).toHaveClass('yellow');
    });

    it("renders with 'grey' class if the status is equal absent", () => {
      const letter = 'F';
      const status = 'absent';
      const { getAllByText } = render(Letter, { letter, status });

      expect(getAllByText(letter)[1]).toHaveClass('grey');
    });
  });
});
