import { render } from '@testing-library/react';

import PagesError from './pages-error';

describe('PagesError', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesError />);
    expect(baseElement).toBeTruthy();
  });
});
