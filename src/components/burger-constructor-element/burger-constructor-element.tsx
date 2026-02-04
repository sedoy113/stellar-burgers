import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import {
  moveIngredient,
  removeIngredient
} from '../../services/Slices/constructorIngridients.slice';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index }) => {
    const dispatch = useDispatch();
    const ingredients = useSelector(
      (state: RootState) => state.constructorReducer.currentIngredients
    );
    const totalItems = ingredients.length;
    const handleMoveDown = () => {};

    const handleMoveIngr = (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    };

    const handleMoveUp = () => {};

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => handleMoveIngr(index, index - 1)}
        handleMoveDown={() => handleMoveIngr(index, index + 1)}
        handleClose={handleClose}
      />
    );
  }
);
