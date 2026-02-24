import { TFeedsResponse } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsThunk, getOrderByNumber } from '../AsyncThunk/orderThunk';

interface IOrderState {
  orders: TOrder[];
  isLoading: boolean;
  hasError: string | undefined;
  total: number;
  totalToday: number;
  success: boolean;
  orderModalData: TOrder | null;
  currentOrder: TOrder | null;
}

const initialState: IOrderState = {
  orders: [],
  isLoading: false,
  hasError: '',
  total: 0,
  totalToday: 0,
  success: false,
  orderModalData: null,
  currentOrder: null
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    ingridientsFeed: (state) => state.orders.map((item) => item.ingredients),
    loadingSelector: (state) => state.isLoading,
    currentOrderSelector: (state) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getFeedsThunk.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.isLoading = false;
          state.success = action.payload.success;
        }
      )
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.hasError = action.error.message || 'Ошибка загрузки заказов';
        state.isLoading = false;
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(getOrderByNumber.rejected, (state, action) => {
        (state.isLoading = false), (state.hasError = action.error.message);
      });
  }
});

export const { reducer } = orderSlice;
export const {
  getOrdersSelector,
  loadingSelector,
  ingridientsFeed,
  currentOrderSelector
} = orderSlice.selectors;
export default orderSlice.reducer;
