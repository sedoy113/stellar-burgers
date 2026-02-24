import { Button } from '@zlden/react-developer-burger-ui-components';
import styles from './successButton.module.css';

interface Props {
  children: string;
  onClick?: () => void;
}

export const SuccessModalButtonUI = ({ children, onClick }: Props) => (
  <Button
    extraClass={styles.marginTop}
    onClick={onClick}
    type='primary'
    size='medium'
    htmlType='submit'
  >
    {children}
  </Button>
);
