import { Preloader } from '@ui';
import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { autorizationThunk } from '../../services/AsyncThunk/autorizationUserThunk';
import {
  errorAuthSelector,
  isSuccessAuthSelector
} from '../../services/Slices/autorizationSlice.slice';
import { useDispatch, useSelector } from '../../services/store';
import { getUserThunk } from '../../services/AsyncThunk/userThunk';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorText = useSelector(errorAuthSelector);
  const isLoading = useSelector((state) => state.autorizationSlice.isLoading);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(autorizationThunk({ email, password }));

    if (autorizationThunk.fulfilled.match(resultAction)) {
      await dispatch(getUserThunk());
      navigate(from, { replace: true });
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
