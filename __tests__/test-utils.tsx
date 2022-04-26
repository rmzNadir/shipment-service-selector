import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React, { ReactElement, Reducer } from 'react';
import { Provider } from 'react-redux';

import { skydropxApi } from '@/services/api';

interface Options {
  initialState: Reducer<any, AnyAction>;
  store?: ReturnType<typeof configureStore>;
}

function render(
  ui: ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: { [skydropxApi.reducerPath]: skydropxApi.reducer, initialState },
    }),
    ...renderOptions
  }: Options = { initialState: () => null }
) {
  function Wrapper({ children }: { children: ReactElement }) {
    return (
      <Provider store={store}>
        <ColorSchemeProvider colorScheme="dark" toggleColorScheme={() => {}}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme: 'dark' }}
          >
            <NotificationsProvider position="top-center">
              {children}
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
