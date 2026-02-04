import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersThunk } from '../AsyncThunk/orderThunk';

interface IInitialProfileOrdersState {
  orders: TOrder[];
  hasError: string | undefined;
  isLoading: boolean;
}

const initialState: IInitialProfileOrdersState = {
  orders: [],
  hasError: '',
  isLoading: false
};

const profileOrdersSlice = createSlice({
  name: 'profileOrdersSlice',
  initialState,
  reducers: {},
  selectors: {
    profileOrdersSelector: (state) => state.orders,
    profileIsLoadingSelector: (state) => state.isLoading,
    profileErrorSelector: (state) => state.hasError
  },

  extraReducers: (builder) =>
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.hasError = undefined;
      })

      .addCase(
        getOrdersThunk.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )

      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error.message || 'Ошибка загрузки ордеров';
      })
});

export const {
  profileOrdersSelector,
  profileIsLoadingSelector,
  profileErrorSelector
} = profileOrdersSlice.selectors;
export default profileOrdersSlice.reducer;
