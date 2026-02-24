import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerThunk } from '../../services/AsyncThunk/registerUserThunk';
import {
  errorRegisterSelector,
  registerLoadingSelector,
  registerSuccessSelector
} from '../../services/Slices/register.slice';
import { useDispatch, useSelector } from '../../services/store';
import { validateregisterForm } from '../../utils/validation';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isLoading = useSelector(registerLoadingSelector);
  const errorMessage = useSelector(errorRegisterSelector);
  const isSucess = useSelector(registerSuccessSelector);

  useEffect(() => {
    if (isSucess) {
      navigation('/login', { replace: true });
    }
  }, [isSucess]);

  const formData = useMemo(
    () => ({ name: userName, email, password }),
    [userName, email, password]
  );

  const validationResult = useMemo(
    () => validateregisterForm(formData),
    [formData]
  );

  const errors = useMemo(
    () => validationResult.getErrors(),
    [validationResult]
  );

  const hasErrors = validationResult.hasErrors();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, password: true });

    if (hasErrors) return;

    dispatch(registerThunk({ name: userName, email, password }));
  };

  const handleFieldChange = (
    field: 'name' | 'email' | 'password',
    v: React.SetStateAction<string>
  ) => {
    if (typeof v === 'function') {
      if (field === 'name')
        setUserName((prev) => (v as (s: string) => string)(prev));

      if (field === 'password')
        setPassword((prev) => (v as (s: string) => string)(prev));

      setTouched((t) => ({ ...t, [field]: true }));
      return;
    }

    const value = v as string;
    if (field === 'name') setUserName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    setTouched((t) => ({ ...t, [field]: true }));
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={errorMessage}
      email={email}
      userName={userName}
      password={password}
      setEmail={(v) => handleFieldChange('email', v)}
      setPassword={(v) => handleFieldChange('password', v)}
      setUserName={(v) => handleFieldChange('name', v)}
      handleSubmit={handleSubmit}
      fieldErrors={errors}
      touched={touched}
    />
  );
};
