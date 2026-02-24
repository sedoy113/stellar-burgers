import {
  reducer,
  showRegistrationSuccessModal,
  closeRegistrationSuccessModal
} from './register.slice';
import { registerThunk } from '../AsyncThunk/registerUserThunk';
import { TUser } from '@utils-types';

describe('registerSlice', () => {
  const initialState = {
    isLoading: false,
    success: false,
    hasError: '',
    onModalopen: false
  };

  const mockUser: TUser = {
    name: 'Новый пользователь',
    email: 'new@test.com'
  };

  const mockRegisterResponse = {
    user: mockUser,
    refreshToken: 'refresh-token',
    accessToken: 'access-token',
    success: true
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать showRegistrationSuccessModal', () => {
    const state = reducer(initialState, showRegistrationSuccessModal());

    expect(state.onModalopen).toBe(true);
  });

  it('должен обработать closeRegistrationSuccessModal', () => {
    const stateWithModal = {
      ...initialState,
      onModalopen: true
    };
    const state = reducer(stateWithModal, closeRegistrationSuccessModal());

    expect(state.onModalopen).toBe(false);
  });

  describe('registerThunk', () => {
    it('должен обработать registerThunk.pending', () => {
      const action = { type: registerThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен обработать registerThunk.fulfilled', () => {
      const action = {
        type: registerThunk.fulfilled.type,
        payload: mockRegisterResponse
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.hasError).toBe('');
    });

    it('должен обработать registerThunk.rejected', () => {
      const action = {
        type: registerThunk.rejected.type,
        error: { message: 'Email уже используется' }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.hasError).toBe('Email уже используется');
    });

    it('должен установить дефолтное сообщение при registerThunk.rejected без message', () => {
      const action = {
        type: registerThunk.rejected.type,
        error: {}
      };
      const state = reducer(initialState, action);

      expect(state.hasError).toBe('Ошибка регистрации пользователя');
    });
  });
});
