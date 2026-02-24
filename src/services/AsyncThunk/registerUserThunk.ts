import { TRegisterData, registerUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerThunk = createAsyncThunk(
  'register/user',
  async (data: TRegisterData) => {
    try {
      const response = await registerUserApi(data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
