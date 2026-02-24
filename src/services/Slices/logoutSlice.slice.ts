import { createSlice } from '@reduxjs/toolkit';
import { logoutThunk } from '../AsyncThunk/logoutThunk';

interface IInitialState {
  success: boolean;
  isLoading: boolean;
  hasError?: string;
}

const initialState: IInitialState = {
  success: false,
  isLoading: false,
  hasError: ''
};

const logoutUserSlice = createSlice({
  name: 'logoutUserSlice',
  initialState,
  reducers: {},
  selectors: {
    isLoadingLogout: (state) => state.isLoading,
    isSuccessLogout: (state) => state.success
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.success = true;
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.hasError = action.error.message;
        state.isLoading = false;
      });
  }
});

export const { reducer } = logoutUserSlice;
export const { isLoadingLogout, isSuccessLogout } = logoutUserSlice.selectors;
