import { reducer } from './logoutSlice.slice';
import { logoutThunk } from '../AsyncThunk/logoutThunk';

describe('logoutUserSlice', () => {
  const initialState = {
    success: false,
    isLoading: false,
    hasError: ''
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать logoutThunk.pending', () => {
    const action = { type: logoutThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it('должен обработать logoutThunk.fulfilled', () => {
    const action = { type: logoutThunk.fulfilled.type };
    const state = reducer(initialState, action);

    expect(state.success).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('должен обработать logoutThunk.rejected', () => {
    const action = {
      type: logoutThunk.rejected.type,
      error: { message: 'Ошибка выхода' }
    };
    const state = reducer(initialState, action);

    expect(state.hasError).toBe('Ошибка выхода');
    expect(state.isLoading).toBe(false);
  });
});
