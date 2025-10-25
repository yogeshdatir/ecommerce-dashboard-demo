import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test Setup', () => {
  it('should render a simple component', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should support jest-dom matchers', () => {
    render(<button disabled>Click</button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
