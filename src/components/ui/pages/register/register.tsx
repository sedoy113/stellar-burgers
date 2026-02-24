import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../common.module.css';
import { RegisterUIProps } from './type';

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
  userName,
  setUserName,
  fieldErrors = {},
  touched = {}
}) => {
  const renderFirstError = (field: string) => {
    const arr = fieldErrors[field];
    return arr && arr.length ? arr[0] : null;
  };

  return (
    <main className={styles.container}>
      <div className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
        <form
          className={`pb-15 ${styles.form}`}
          name='register'
          onSubmit={handleSubmit}
        >
          <>
            <div className='pb-6'>
              <Input
                type='text'
                placeholder='Имя'
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                name='name'
                error={Boolean(touched.name && renderFirstError('name'))}
                errorText={renderFirstError('name') || ''}
                size='default'
              />
            </div>
            <div className='pb-6'>
              <Input
                type='email'
                placeholder='E-mail'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name={'email'}
                error={Boolean(touched.email && renderFirstError('email'))}
                errorText={renderFirstError('email') || ''}
                size={'default'}
              />
            </div>
            <div className='pb-6'>
              <PasswordInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name='password'
              />
              {/* PasswordInput из UI-библиотеки может не поддерживать errorText, тогда рендерим ошибку вручную */}
              {touched.password && renderFirstError('password') && (
                <p className={`${styles.error} text text_type_main-default`}>
                  {renderFirstError('password')}
                </p>
              )}
            </div>
            <div className={`pb-6 ${styles.button}`}>
              <Button type='primary' size='medium' htmlType='submit'>
                Зарегистрироваться
              </Button>
            </div>
            {errorText && errorText !== '' && (
              <p className={`${styles.error} text text_type_main-default pb-6`}>
                {errorText === 'User already exists' &&
                  'Пользователь уже существует'}
              </p>
            )}
          </>
        </form>
        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Уже зарегистрированы?
          <Link to='/login' className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};

// import {
//   Button,
//   Input,
//   PasswordInput
// } from '@zlden/react-developer-burger-ui-components';
// import { FC } from 'react';
// import { Link } from 'react-router-dom';
// import styles from '../common.module.css';
// import { RegisterUIProps } from './type';

// export const RegisterUI: FC<RegisterUIProps> = ({
//   errorText,
//   email,
//   setEmail,
//   handleSubmit,
//   password,
//   setPassword,
//   userName,
//   setUserName
// }) => (
//   <main className={styles.container}>
//     <div className={`pt-6 ${styles.wrapCenter}`}>
//       <h3 className='pb-6 text text_type_main-medium'>Регистрация</h3>
//       <form
//         className={`pb-15 ${styles.form}`}
//         name='register'
//         onSubmit={handleSubmit}
//       >
//         <>
//           <div className='pb-6'>
//             <Input
//               type='text'
//               placeholder='Имя'
//               onChange={(e) => {
//                 setUserName(e.target.value);
//                 console.log(userName);
//               }}
//               value={userName}
//               name='name'
//               error={false}
//               errorText='Неккоректный email'
//               size='default'
//             />
//           </div>
//           <div className='pb-6'>
//             <Input
//               type='email'
//               placeholder='E-mail'
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               name={'email'}
//               error={false}
//               errorText='Неккоректный пароль'
//               size={'default'}
//             />
//           </div>
//           <div className='pb-6'>
//             <PasswordInput
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               name='password'
//             />
//           </div>
//           <div className={`pb-6 ${styles.button}`}>
//             <Button type='primary' size='medium' htmlType='submit'>
//               Зарегистрироваться
//             </Button>
//           </div>
//           {errorText && errorText !== '' && (
//             <p className={`${styles.error} text text_type_main-default pb-6`}>
//               {errorText === 'User already exists' &&
//                 'Пользователь уже существует'}
//             </p>
//           )}
//         </>
//       </form>
//       <div className={`${styles.question} text text_type_main-default pb-6`}>
//         Уже зарегистрированы?
//         <Link to='/login' className={`pl-2 ${styles.link}`}>
//           Войти
//         </Link>
//       </div>
//     </div>
//   </main>
// );
