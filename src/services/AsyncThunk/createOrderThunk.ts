import { orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const createOrderThunk = createAsyncThunk<
  TNewOrderResponse,
  void,
  { state: RootState; rejectValue: string }
>('order/createOrder', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const bunId = state.constructorReducer.bun?._id;
    const currentIngredientIds =
      state.constructorReducer.currentIngredients.map(
        (item: { _id: string }) => item._id
      );

    if (!bunId) {
      return rejectWithValue('Булка не выбрана');
    }

    const payloadIds = [bunId, ...currentIngredientIds, bunId];
    const res: TNewOrderResponse = await orderBurgerApi(payloadIds);
    return res;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Ошибка оформления заказа');
  }
});
