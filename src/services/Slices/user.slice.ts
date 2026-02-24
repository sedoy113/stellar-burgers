import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { logoutThunk } from '../AsyncThunk/logoutThunk';
import { getUserThunk, updateUserThunk } from '../AsyncThunk/userThunk';

interface IInitialState {
  user: TUser | null;
  isAuthchecked: boolean;
  isLoading: boolean;
  success: boolean;
  hasError: string | undefined;
}

const initialState: IInitialState = {
  user: null,
  isAuthchecked: true,
  isLoading: false,
  success: false,
  hasError: undefined
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  selectors: {
    getUserSelector: (state) => state.user,
    getIsLoadingSelector: (state) => state.isLoading,
    getIsAuthCheckSelector: (state) => state.isAuthchecked,
    errorUserSelector: (state) => state.hasError
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.hasError = undefined;
        state.isAuthchecked = false;
      })
      .addCase(
        getUserThunk.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isLoading = false;
          state.success = true;
          state.isAuthchecked = true;
        }
      )
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isAuthchecked = true;
        state.isLoading = false;
        state.success = false;
        state.hasError = action.error.message || 'Ошибка загрузки пользователя';
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.isLoading = false;
          state.success = true;
          state.user = action.payload;
        }
      )

      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.hasError =
          action.error.message || 'Ошибка обновления пользователя';
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      })
});

export const { reducer } = userSlice;
export const {
  getUserSelector,
  getIsLoadingSelector,
  getIsAuthCheckSelector,
  errorUserSelector
} = userSlice.selectors;
