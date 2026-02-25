import reducer from './updateTokens.slice';
import { updateTokensThunk } from '../AsyncThunk/updateTokens';

describe('updateTokensSlice', () => {
  const initialState = {
    isLoading: false,
    hasError: undefined
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать updateTokensThunk.pending', () => {
    const action = { type: updateTokensThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it('должен обработать updateTokensThunk.fulfilled', () => {
    const action = { type: updateTokensThunk.fulfilled.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });

  it('должен обработать updateTokensThunk.rejected', () => {
    const action = {
      type: updateTokensThunk.rejected.type,
      error: { message: 'Токен истек' }
    };
    const state = reducer(initialState, action);

    expect(state.hasError).toBe('Токен истек');
  });

  it('должен установить дефолтное сообщение при updateTokensThunk.rejected без message', () => {
    const action = {
      type: updateTokensThunk.rejected.type,
      error: {}
    };
    const state = reducer(initialState, action);

    expect(state.hasError).toBe('Ошибка обновления токенов');
  });
});
