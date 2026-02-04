import { useNavigate } from 'react-router-dom';
import { closeRegistrationSuccessModal } from '../../services/Slices/register.slice';
import { useDispatch } from '../../services/store';
import { SuccessModalButtonUI } from '../ui/success-modal-button/successModalButtonUI';

export const SuccessModalButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigate('/login', { replace: true });
    setTimeout(() => {
      dispatch(closeRegistrationSuccessModal());
    }, 100);
  };

  return (
    <SuccessModalButtonUI onClick={handleNavigate}>Войти</SuccessModalButtonUI>
  );
};
