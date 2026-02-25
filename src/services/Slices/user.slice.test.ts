import { reducer } from './user.slice';
import { getUserThunk, updateUserThunk } from '../AsyncThunk/userThunk';
import { logoutThunk } from '../AsyncThunk/logoutThunk';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthchecked: true,
    isLoading: false,
    success: false,
    hasError: undefined
  };

  const mockUser: TUser = {
    name: 'Иван',
    email: 'test@test.com'
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('getUserThunk', () => {
    it('должен обработать getUserThunk.pending', () => {
      const action = { type: getUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.hasError).toBeUndefined();
      expect(state.isAuthchecked).toBe(false);
    });

    it('должен обработать getUserThunk.fulfilled', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: mockUser
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.isAuthchecked).toBe(true);
    });

    it('должен обработать getUserThunk.rejected', () => {
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const state = reducer(initialState, action);

      expect(state.isAuthchecked).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.hasError).toBe('Ошибка сети');
    });

    it('должен установить дефолтное сообщение при getUserThunk.rejected без message', () => {
      const action = {
        type: getUserThunk.rejected.type,
        error: {}
      };
      const state = reducer(initialState, action);

      expect(state.hasError).toBe('Ошибка загрузки пользователя');
    });
  });

  describe('updateUserThunk', () => {
    it('должен обработать updateUserThunk.pending', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен обработать updateUserThunk.fulfilled', () => {
      const updatedUser: TUser = {
        name: 'Петр',
        email: 'new@test.com'
      };
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: updatedUser
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(updatedUser);
    });

    it('должен обработать updateUserThunk.rejected', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: 'Ошибка обновления' }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.hasError).toBe('Ошибка обновления');
    });

    it('должен установить дефолтное сообщение при updateUserThunk.rejected без message', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        error: {}
      };
      const state = reducer(initialState, action);

      expect(state.hasError).toBe('Ошибка обновления пользователя');
    });
  });

  describe('logoutThunk', () => {
    it('должен обработать logoutThunk.fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };
      const action = { type: logoutThunk.fulfilled.type };
      const state = reducer(stateWithUser, action);

      expect(state.user).toBeNull();
    });
  });
});
