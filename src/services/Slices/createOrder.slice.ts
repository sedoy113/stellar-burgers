import { TNewOrderResponse } from '@api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrderThunk } from '../AsyncThunk/createOrderThunk';

interface IInitialState {
  order: TOrder[];
  isLoading: boolean;
  orderModalData: TOrder | null;
  hasError: string | undefined;
  success: boolean;
}

const initialState: IInitialState = {
  order: [],
  isLoading: false,
  orderModalData: null,
  hasError: undefined,
  success: false
};

const createOrderSlice = createSlice({
  name: 'createOrderSlice',
  initialState,
  selectors: {
    oredersSelectors: (state) => state.order,
    ordersLoading: (state) => state.isLoading,
    orderModalDataSelector: (state) => state.orderModalData,
    errorCreateOrderSelector: (state) => state.hasError,
    isSuccessCreateOrderSelector: (state) => state.success
  },
  reducers: {
    closeModalData: (state) => {
      state.orderModalData = null;
      state.hasError = undefined;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.hasError = '';
      })
      .addCase(
        createOrderThunk.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.isLoading = false;
          state.success = action.payload.success;
          state.order.push(action.payload.order);
          state.orderModalData = action.payload.order;
        }
      )
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.hasError = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export default createOrderSlice.reducer;

export const { closeModalData } = createOrderSlice.actions;

export const {
  ordersLoading,
  oredersSelectors,
  orderModalDataSelector,
  errorCreateOrderSelector,
  isSuccessCreateOrderSelector
} = createOrderSlice.selectors;
