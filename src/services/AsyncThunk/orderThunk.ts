import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const orderThunk = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('order/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    return [];
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Ошибка загрузки заказов');
  }
});

export const getFeedsThunk = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('order/getOrder', async (_, { rejectWithValue }) => {
  try {
    const response = await getFeedsApi();
    return response;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error?.message || 'Ошибка загрузки заказов');
  }
});

export const getOrderByNumber = createAsyncThunk(
  'orderDetails/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number);
      return res.orders[0] || null;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Не удалось получить заказ');
    }
  }
);

export const getOrdersThunk = createAsyncThunk(
  'profileOrders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOrdersApi();
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.message || 'Не удалось получить данные заказов'
      );
    }
  }
);
