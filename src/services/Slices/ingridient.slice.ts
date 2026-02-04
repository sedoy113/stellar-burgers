import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { ingredientsThunk } from '../AsyncThunk/ingredientsThunk';

interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  hasError: string | null;
}

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  hasError: null
};

const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isIngridientLoading: (state) => state.isLoading,
    errorLoadingIngSelector: (state) => state.hasError
  },
  reducers: {
    setIngridients(state) {
      const ingredients = state.ingredients;
      ingredients.map((item) => {});
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        ingredientsThunk.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
          state.hasError = null;
        }
      )
      .addCase(ingredientsThunk.rejected, (state, action) => {
        state.hasError = action.error.message || 'Ошибка загрузки ингридиентов';
      });
  }
});

export const { reducer } = ingredientsSlice;
export const {
  ingredientsSelector,
  isIngridientLoading,
  errorLoadingIngSelector
} = ingredientsSlice.selectors;
