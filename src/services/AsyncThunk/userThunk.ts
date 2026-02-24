import { getUserApi, TRegisterData, updateUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserThunk = createAsyncThunk('user/getUser', async () => {
  try {
    const response = await getUserApi();
    return response.user;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
