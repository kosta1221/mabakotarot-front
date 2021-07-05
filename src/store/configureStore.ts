/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { loadState, saveState } from '../utils/localStorage';
import { RootState } from 'types';
import throttle from 'lodash/throttle';

import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const preloadedState: RootState = {
    drawer: {
      comparisons: loadState() || [],
      isComparisonOpen: true,
      isDrawerDisplayed: false,
    },
  };

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers,
  });

  store.subscribe(
    throttle(() => {
      saveState(store.getState().drawer.comparisons);
    }, 1000),
  );

  return store;
}
