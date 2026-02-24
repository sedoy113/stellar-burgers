import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  resetPasswordApi,
  TLoginData
} from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';
import { getUserThunk } from './userThunk';

export const autorizationThunk = createAsyncThunk(
  'authorization/user',
  async (data: TLoginData, thunkAPI) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken || '');
      setCookie('accessToken', response.accessToken || '');
      await thunkAPI.dispatch(getUserThunk());
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

interface IResetPassword {
  password: string;
  token: string;
}

export const resetPaswordThunk = createAsyncThunk(
  'resetPassword/user',
  async (props: IResetPassword) => {
    try {
      const response = await resetPasswordApi(props);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
