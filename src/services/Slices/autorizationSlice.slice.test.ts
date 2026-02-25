import { reducer, initialState } from './autorizationSlice.slice';
import {
  autorizationThunk,
  resetPaswordThunk
} from '../AsyncThunk/autorizationUserThunk';
import { TUser } from '@utils-types';

describe('autorizationSlice', () => {

  const mockUser: TUser = {
    name: 'Иван',
    email: 'test@test.com'
  };

  const mockAuthResponse = {
    user: mockUser,
    refreshToken: 'refresh-token',
    accessToken: 'access-token',
    success: true
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('autorizationThunk', () => {
    it('должен обработать autorizationThunk.pending', () => {
      const action = { type: autorizationThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.isAuthCheck).toBe(false);
    });

    it('должен обработать autorizationThunk.fulfilled', () => {
      const action = {
        type: autorizationThunk.fulfilled.type,
        payload: mockAuthResponse
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.hasError).toBe('');
      expect(state.isAuthCheck).toBe(true);
    });

    it('должен обработать autorizationThunk.rejected', () => {
      const action = {
        type: autorizationThunk.rejected.type,
        error: { message: 'Неверные данные' }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.hasError).toBe('Неверные данные');
      expect(state.isAuthCheck).toBe(true);
      expect(state.success).toBe(false);
    });

    it('должен установить дефолтное сообщение при autorizationThunk.rejected без message', () => {
      const action = {
        type: autorizationThunk.rejected.type,
        error: {}
      };
      const state = reducer(initialState, action);

      expect(state.hasError).toBe('Ошибка авторизации пользователя');
    });
  });

  describe('resetPaswordThunk', () => {
    it('должен обработать resetPaswordThunk.pending', () => {
      const action = { type: resetPaswordThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен обработать resetPaswordThunk.fulfilled', () => {
      const action = { type: resetPaswordThunk.fulfilled.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
    });

    it('должен обработать resetPaswordThunk.rejected', () => {
      const action = {
        type: resetPaswordThunk.rejected.type,
        error: { message: 'Ошибка сброса пароля' }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.hasError).toBe('Ошибка сброса пароля');
    });
  });
});
