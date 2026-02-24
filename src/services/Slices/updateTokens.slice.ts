import { createSlice } from '@reduxjs/toolkit';
import { updateTokensThunk } from '../AsyncThunk/updateTokens';

interface IUpdateTokens {
  isLoading: boolean;
  hasError: string | undefined;
}

const initialState: IUpdateTokens = {
  isLoading: false,
  hasError: undefined
};

const updateTokensSlice = createSlice({
  name: 'updateTokensSlice',
  initialState,
  selectors: {
    errorTokensSelector: (state) => state.hasError,
    isLoadingTokensSelector: (state) => state.isLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTokensThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTokensThunk.rejected, (state, action) => {
        state.hasError = action.error.message || 'Ошибка обновления токенов';
      });
  }
});

export const { errorTokensSelector, isLoadingTokensSelector } =
  updateTokensSlice.selectors;
export default updateTokensSlice.reducer;
