import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  emailRef?: React.RefObject<HTMLInputElement>;
  passwordRef?: React.RefObject<HTMLInputElement>;
};
