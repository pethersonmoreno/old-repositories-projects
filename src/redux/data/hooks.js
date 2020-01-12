import {
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux';
import DataContext from './context';

export const useDataStore = createStoreHook(DataContext);
export const useDataDispatch = createDispatchHook(DataContext);
export const useDataSelector = createSelectorHook(DataContext);
