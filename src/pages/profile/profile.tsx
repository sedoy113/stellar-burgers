import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  getUserThunk,
  updateUserThunk
} from '../../services/AsyncThunk/userThunk';
import { isLoadingLogout } from '../../services/Slices/logoutSlice.slice';
import {
  getIsLoadingSelector,
  getUserSelector
} from '../../services/Slices/user.slice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const userName = useSelector(getUserSelector)?.name ?? '';
  const emailUser = useSelector(getUserSelector)?.email ?? '';
  const isLogoutLoading = useSelector(isLoadingLogout);
  const isUpdateloading = useSelector(getIsLoadingSelector);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: userName,
    email: emailUser,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => {
      if (
        prevState.name.toLowerCase() === userName.toLowerCase() &&
        prevState.email.toLowerCase() === emailUser.toLowerCase()
      )
        return prevState;

      return {
        ...prevState,
        name: userName,
        email: emailUser,
        password: ''
      };
    });

    if (!userName || !emailUser) {
      dispatch(getUserThunk());
    }
  }, [userName, emailUser, dispatch]);

  const isFormChanged =
    formValue.name !== userName ||
    formValue.email !== emailUser ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserThunk(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userName,
      email: emailUser,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return isLogoutLoading ? (
    <Preloader />
  ) : (
    <ProfileUI
      formValue={formValue}
      isLoading={isUpdateloading}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
