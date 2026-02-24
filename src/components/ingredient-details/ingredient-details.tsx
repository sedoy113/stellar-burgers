import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ingredientsThunk } from '../../services/AsyncThunk/ingredientsThunk';
import { ingredientsSelector } from '../../services/Slices/ingridient.slice';
import { useDispatch, useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const ingredients = useSelector(ingredientsSelector);
  const ingredientData = ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(ingredientsThunk());
    }
  }, [dispatch, ingredients.length]);

  return !ingredientData ? (
    <Preloader />
  ) : (
    <IngredientDetailsUI ingredientData={ingredientData} />
  );
};
