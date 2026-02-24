import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import createOrderSlice from '../services/Slices/createOrder.slice';
import { reducer as orderSlice } from '../services/Slices/order.slice';
import { reducer as autorizationSlice } from './Slices/autorizationSlice.slice';
import constructorReducer from './Slices/constructorIngridients.slice';
import { reducer as ingredientsSlice } from './Slices/ingridient.slice';
import { reducer as logoutUserSlice } from './Slices/logoutSlice.slice';
import profileOrdersSlice from './Slices/profileOrders.slice';
import registerSlice from './Slices/register.slice';
import updateTokensSlice from './Slices/updateTokens.slice';
import { reducer as userSlice } from './Slices/user.slice';
const rootReducer = combineReducers({
  ingredientsSlice,
  constructorReducer,
  registerSlice,
  autorizationSlice,
  logoutUserSlice,
  userSlice,
  orderSlice,
  createOrderSlice,
  profileOrdersSlice,
  updateTokensSlice
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
