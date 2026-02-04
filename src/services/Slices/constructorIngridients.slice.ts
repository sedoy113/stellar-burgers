import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IConstructorIngridientsState {
  currentIngredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
}

const initialState: IConstructorIngridientsState = {
  currentIngredients: [],
  bun: null
};

const constructorIngridientsSlice = createSlice({
  name: 'constructorReducer',
  initialState: initialState,
  selectors: {
    getCurrentIngredientSelector: (state) =>
      state.currentIngredients.map(({ name, price, image }: TIngredient) => ({
        name,
        price,
        image
      })),
    getIdBun: (state) => state.bun?._id
  },
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.currentIngredients.push(action.payload);
    },
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.bun = action.payload;
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.currentIngredients = state.currentIngredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor(state) {
      state.currentIngredients = [];
      state.bun = null;
    },
    moveIngredient(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      if (dragIndex !== hoverIndex) {
        const newArr = [...state.currentIngredients];
        const [removed] = newArr.splice(dragIndex, 1);
        newArr.splice(hoverIndex, 0, removed);
        state.currentIngredients = newArr;
      }
    }
  }
});

export const setBunWithId = (
  ingredient: TIngredient
): PayloadAction<TConstructorIngredient> =>
  constructorIngridientsSlice.actions.setBun({ ...ingredient, id: nanoid(10) });

export const setIngredientWithId = (
  ingredient: TIngredient
): PayloadAction<TConstructorIngredient> =>
  constructorIngridientsSlice.actions.addIngredient({
    ...ingredient,
    id: nanoid(10)
  });

export const {
  addIngredient,
  setBun,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = constructorIngridientsSlice.actions;
export const { getCurrentIngredientSelector, getIdBun } =
  constructorIngridientsSlice.selectors;
export default constructorIngridientsSlice.reducer;
