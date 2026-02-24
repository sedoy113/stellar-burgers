import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import {
  setBunWithId,
  setIngredientWithId
} from '../../services/Slices/constructorIngridients.slice';
import { useDispatch, useSelector } from '../../services/store';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const currentIngredients = useSelector(
      (state) => state.constructorReducer.currentIngredients
    );

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBunWithId(ingredient));
      } else {
        dispatch(setIngredientWithId(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
