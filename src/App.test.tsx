import React from 'react';
import { render, act } from '@testing-library/react';
import App from './App';

const originalFetch = global.fetch;
let mockFetch = jest.fn();
beforeEach(() => {
  mockFetch = jest.fn();
  global.fetch = mockFetch;
});
afterAll(() => {
  global.fetch = originalFetch;
});

describe('App', () => {
  test('load data - loading while wait finish load', async () => {
    mockFetch.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        json: () => Promise.resolve({
          name: 'Test Name', presentation: 'Test presentation', location: 'Location example', social: [{ item: 'linkedin', link: 'https://www.linkedin.com/in/example/' }],
        }),
      };
    });
    const { container } = render(<App />);
    const containerApp = container.querySelector('.app');
    expect(containerApp).toBeInTheDocument();
    expect(containerApp?.querySelector('h1')).toHaveTextContent('Loading ...');
    await act(() => new Promise((resolve) => setTimeout(resolve, 300)));
    expect(containerApp?.querySelector('h1')).not.toHaveTextContent('Loading ...');
    expect(containerApp?.querySelector('h1')).toHaveTextContent('I\'m Test Name');
    expect(containerApp?.querySelector('.presentation')).toHaveTextContent('Test presentation');
    expect(containerApp?.querySelector('.location')).toHaveTextContent('Location example');
  });
});
