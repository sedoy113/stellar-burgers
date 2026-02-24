import { reducer } from './order.slice';
import { getFeedsThunk, getOrderByNumber } from '../AsyncThunk/orderThunk';
import { TFeedsResponse } from '@api';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    hasError: '',
    total: 0,
    totalToday: 0,
    success: false,
    orderModalData: null,
    currentOrder: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Бургер 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 100
    },
    {
      _id: '2',
      ingredients: ['3', '4'],
      status: 'pending',
      name: 'Бургер 2',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
      number: 101
    }
  ];

  const mockFeedsResponse: TFeedsResponse = {
    success: true,
    orders: mockOrders,
    total: 1000,
    totalToday: 50
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('getFeedsThunk', () => {
    it('должен обработать getFeedsThunk.pending', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен обработать getFeedsThunk.fulfilled', () => {
      const action = {
        type: getFeedsThunk.fulfilled.type,
        payload: mockFeedsResponse
      };
      const state = reducer(initialState, action);

      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(1000);
      expect(state.totalToday).toBe(50);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
    });

    it('должен обработать getFeedsThunk.rejected', () => {
      const action = {
        type: getFeedsThunk.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const state = reducer(initialState, action);

      expect(state.hasError).toBe('Ошибка сети');
      expect(state.isLoading).toBe(false);
    });

    it('должен установить дефолтное сообщение при getFeedsThunk.rejected без message', () => {
      const action = {
        type: getFeedsThunk.rejected.type,
        error: {}
      };
      const state = reducer(initialState, action);

      expect(state.hasError).toBe('Ошибка загрузки заказов');
    });
  });

  describe('getOrderByNumber', () => {
    it('должен обработать getOrderByNumber.pending', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен обработать getOrderByNumber.fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: mockOrders[0]
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.currentOrder).toEqual(mockOrders[0]);
    });

    it('должен обработать getOrderByNumber.rejected', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Заказ не найден' }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.hasError).toBe('Заказ не найден');
    });
  });
});
