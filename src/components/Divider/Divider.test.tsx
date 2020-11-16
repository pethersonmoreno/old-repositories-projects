import React from 'react';
import { render } from '@testing-library/react';
import Divider from './index';

test('Divider', () => {
  const { container } = render(<Divider />);
  const el = container.firstChild as HTMLDivElement;
  expect(el.className).toBe('divider');
});
