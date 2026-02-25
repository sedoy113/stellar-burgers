import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  autorizationThunk,
  resetPaswordThunk
} from '../AsyncThunk/autorizationUserThunk';

type IInitialState = {
  isLoading?: boolean;
  success?: boolean;
  hasError?: string;
  isAuthCheck?: boolean;
  user: TUser | undefined;
};

export const initialState: IInitialState = {
  isLoading: false,
  success: false,
  hasError: '',
  isAuthCheck: false,
  user: undefined
};

type IAutorizationAction<T> = {
  user: TUser;
  refreshToken: string;
  accessToken: string;
} & T;

export const autorizationSlice = createSlice({
  name: 'autorizationSlice',
  reducers: {},
  initialState,
  selectors: {
    isSuccessAuthSelector: (state) => state.success,
    errorAuthSelector: (state) => state.hasError,
    userNameSelector: (state) => state.user?.name,
    userEmailSelector: (state) => state.user?.email,
    isloadingAuth: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(autorizationThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthCheck = false;
      })
      .addCase(
        autorizationThunk.fulfilled,
        (state, action: PayloadAction<IAutorizationAction<IInitialState>>) => {
          state.isLoading = false;
          state.success = true;
          state.user = action.payload.user;
          state.hasError = '';
          state.isAuthCheck = true;
        }
      )
      .addCase(autorizationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError =
          action.error.message || 'Ошибка авторизации пользователя';
        state.isAuthCheck = true;
        state.success = false;
      })

      .addCase(resetPaswordThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(resetPaswordThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })

      .addCase(resetPaswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.hasError = action.error.message;
      });
  }
});

export const { reducer } = autorizationSlice;
export const {
  isSuccessAuthSelector,
  errorAuthSelector,
  userNameSelector,
  userEmailSelector,
  isloadingAuth
} = autorizationSlice.selectors;
export default autorizationSlice.reducer;
