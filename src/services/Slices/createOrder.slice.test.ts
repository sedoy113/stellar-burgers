import reducer, { closeModalData } from './createOrder.slice';
import { createOrderThunk } from '../AsyncThunk/createOrderThunk';
import { TNewOrderResponse } from '@api';
import { TOrder } from '@utils-types';

describe('createOrderSlice', () => {
  const initialState = {
    order: [],
    isLoading: false,
    orderModalData: null,
    hasError: undefined,
    success: false
  };

  const mockOrder: TOrder = {
    _id: '123',
    ingredients: ['1', '2', '3'],
    status: 'done',
    name: 'Тестовый бургер',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 12345
  };

  const mockOrderResponse: TNewOrderResponse = {
    success: true,
    order: mockOrder,
    name: 'Тестовый бургер'
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать closeModalData', () => {
    const stateWithModal = {
      ...initialState,
      orderModalData: mockOrder,
      hasError: 'Ошибка'
    };
    const state = reducer(stateWithModal, closeModalData());

    expect(state.orderModalData).toBeNull();
    expect(state.hasError).toBeUndefined();
  });

  describe('createOrderThunk', () => {
    it('должен обработать createOrderThunk.pending', () => {
      const action = { type: createOrderThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.hasError).toBe('');
    });

    it('должен обработать createOrderThunk.fulfilled', () => {
      const action = {
        type: createOrderThunk.fulfilled.type,
        payload: mockOrderResponse
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.order).toHaveLength(1);
      expect(state.order[0]).toEqual(mockOrder);
      expect(state.orderModalData).toEqual(mockOrder);
    });

    it('должен обработать createOrderThunk.rejected', () => {
      const action = {
        type: createOrderThunk.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.hasError).toBe('Ошибка сети');
    });

    it('должен установить дефолтное сообщение при createOrderThunk.rejected без message', () => {
      const action = {
        type: createOrderThunk.rejected.type,
        error: {}
      };
      const state = reducer(initialState, action);

      expect(state.hasError).toBe('Ошибка создания заказа');
    });
  });
});
