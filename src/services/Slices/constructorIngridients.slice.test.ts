import reducer, {
  addIngredient,
  setBun,
  removeIngredient,
  clearConstructor,
  moveIngredient,
  setBunWithId,
  setIngredientWithId
} from './constructorIngridients.slice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('constructorIngridientsSlice', () => {
  const initialState = {
    currentIngredients: [],
    bun: null
  };

  const mockIngredient: TConstructorIngredient = {
    _id: '1',
    id: 'unique-id-1',
    name: 'Соус',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 88,
    image: 'test.png',
    image_mobile: 'test-mobile.png',
    image_large: 'test-large.png'
  };

  const mockBun: TConstructorIngredient = {
    _id: '2',
    id: 'unique-id-2',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'bun.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png'
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать addIngredient', () => {
    const state = reducer(initialState, addIngredient(mockIngredient));

    expect(state.currentIngredients).toHaveLength(1);
    expect(state.currentIngredients[0]).toEqual(mockIngredient);
  });

  it('должен обработать setBun', () => {
    const state = reducer(initialState, setBun(mockBun));

    expect(state.bun).toEqual(mockBun);
  });

  it('должен обработать removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      currentIngredients: [mockIngredient]
    };
    const state = reducer(
      stateWithIngredient,
      removeIngredient(mockIngredient.id)
    );

    expect(state.currentIngredients).toHaveLength(0);
  });

  it('должен обработать clearConstructor', () => {
    const stateWithData = {
      currentIngredients: [mockIngredient],
      bun: mockBun
    };
    const state = reducer(stateWithData, clearConstructor());

    expect(state.currentIngredients).toEqual([]);
    expect(state.bun).toBeNull();
  });

  it('должен обработать moveIngredient', () => {
    const ingredient2: TConstructorIngredient = {
      ...mockIngredient,
      id: 'unique-id-3',
      name: 'Ингредиент 2'
    };
    const ingredient3: TConstructorIngredient = {
      ...mockIngredient,
      id: 'unique-id-4',
      name: 'Ингредиент 3'
    };

    const stateWithIngredients = {
      ...initialState,
      currentIngredients: [mockIngredient, ingredient2, ingredient3]
    };

    const state = reducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 2 })
    );

    expect(state.currentIngredients[0]).toEqual(ingredient2);
    expect(state.currentIngredients[1]).toEqual(ingredient3);
    expect(state.currentIngredients[2]).toEqual(mockIngredient);
  });

  it('не должен изменить порядок если dragIndex === hoverIndex', () => {
    const stateWithIngredients = {
      ...initialState,
      currentIngredients: [mockIngredient]
    };

    const state = reducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 0 })
    );

    expect(state.currentIngredients).toEqual([mockIngredient]);
  });

  it('setBunWithId должен создать action с id', () => {
    const ingredient: TIngredient = {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'bun.png',
      image_mobile: 'bun-mobile.png',
      image_large: 'bun-large.png'
    };

    const action = setBunWithId(ingredient);

    expect(action.payload).toHaveProperty('id');
    expect(action.payload._id).toBe('1');
  });

  it('setIngredientWithId должен создать action с id', () => {
    const ingredient: TIngredient = {
      _id: '1',
      name: 'Соус',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 88,
      image: 'sauce.png',
      image_mobile: 'sauce-mobile.png',
      image_large: 'sauce-large.png'
    };

    const action = setIngredientWithId(ingredient);

    expect(action.payload).toHaveProperty('id');
    expect(action.payload._id).toBe('1');
  });
});
