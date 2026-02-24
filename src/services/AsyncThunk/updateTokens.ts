import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshToken } from '../../utils/burger-api';

export const updateTokensThunk = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('tokens/updateTokens', async (_, { rejectWithValue }) => {
  try {
    const data = await refreshToken();
    return data;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Ошибка обновления токенов');
  }
});
