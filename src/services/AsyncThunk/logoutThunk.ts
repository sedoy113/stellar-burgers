import { logoutApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie } from '../../utils/cookie';

export const logoutThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
