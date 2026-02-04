import { create, enforce, test } from 'vest';

export const validateregisterForm = create('registerForm', (data = {}) => {
  test('name', 'Имя должно быть не менее 2 символов', () => {
    enforce(data.name).longerThanOrEquals(2);
  });
  test('password', 'Пароль должен быть не менее 6 символов', () => {
    enforce(data.password).longerThanOrEquals(6);
  });
});
