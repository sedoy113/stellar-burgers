import reducer from './profileOrders.slice';
import { getOrdersThunk } from '../AsyncThunk/orderThunk';
import { TOrder } from '@utils-types';

describe('profileOrdersSlice', () => {
  const initialState = {
    orders: [],
    hasError: '',
    isLoading: false
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Мой бургер 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 500
    },
    {
      _id: '2',
      ingredients: ['3', '4', '5'],
      status: 'pending',
      name: 'Мой бургер 2',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
      number: 501
    }
  ];

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать getOrdersThunk.pending', () => {
    const action = { type: getOrdersThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBeUndefined();
  });

  it('должен обработать getOrdersThunk.fulfilled', () => {
    const action = {
      type: getOrdersThunk.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('должен обработать getOrdersThunk.rejected', () => {
    const action = {
      type: getOrdersThunk.rejected.type,
      error: { message: 'Нет авторизации' }
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe('Нет авторизации');
  });

  it('должен установить дефолтное сообщение при getOrdersThunk.rejected без message', () => {
    const action = {
      type: getOrdersThunk.rejected.type,
      error: {}
    };
    const state = reducer(initialState, action);

    expect(state.hasError).toBe('Ошибка загрузки ордеров');
  });
});
