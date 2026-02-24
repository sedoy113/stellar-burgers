import { reducer } from './ingridient.slice';
import { ingredientsThunk } from '../AsyncThunk/ingredientsThunk';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    hasError: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '2',
      name: 'Соус',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать ingredientsThunk.pending', () => {
    const action = { type: ingredientsThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it('должен обработать ingredientsThunk.fulfilled', () => {
    const action = {
      type: ingredientsThunk.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.hasError).toBeNull();
  });

  it('должен обработать ingredientsThunk.rejected', () => {
    const action = {
      type: ingredientsThunk.rejected.type,
      error: { message: 'Ошибка сети' }
    };
    const state = reducer(initialState, action);

    expect(state.hasError).toBe('Ошибка сети');
  });

  it('должен установить дефолтное сообщение при отсутствии error.message', () => {
    const action = {
      type: ingredientsThunk.rejected.type,
      error: {}
    };
    const state = reducer(initialState, action);

    expect(state.hasError).toBe('Ошибка загрузки ингридиентов');
  });
});
