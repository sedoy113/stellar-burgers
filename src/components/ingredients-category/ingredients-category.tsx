import { TIngredient } from '@utils-types';
import { forwardRef, useMemo } from 'react';
import { getIdBun } from '../../services/Slices/constructorIngridients.slice';
import { useSelector } from '../../services/store';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const bunId = useSelector(getIdBun);
  const ingridients = useSelector(
    (state) => state.constructorReducer.currentIngredients
  );
  /** TODO: взять переменную из стора */
  const burgerConstructor = {
    bun: {
      _id: bunId
    },
    ingredients: ingridients
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun._id) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
