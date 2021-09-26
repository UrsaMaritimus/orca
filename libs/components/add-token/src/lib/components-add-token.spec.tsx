import { render } from '@testing-library/react';

import ComponentsAddToken from './components-add-token';

describe('ComponentsAddToken', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentsAddToken />);
    expect(baseElement).toBeTruthy();
  });
});
