import { rootReducer } from './store';

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredientsSlice: {
        ingredients: [],
        isLoading: false,
        hasError: null
      },
      constructorReducer: {
        currentIngredients: [],
        bun: null
      },
      registerSlice: {
        isLoading: false,
        success: false,
        hasError: '',
        onModalopen: false
      },
      autorizationSlice: {
        isLoading: false,
        success: false,
        hasError: '',
        isAuthCheck: false,
        user: undefined
      },
      logoutUserSlice: {
        success: false,
        isLoading: false,
        hasError: ''
      },
      userSlice: {
        user: null,
        isAuthchecked: true,
        isLoading: false,
        success: false,
        hasError: undefined
      },
      orderSlice: {
        orders: [],
        isLoading: false,
        hasError: '',
        total: 0,
        totalToday: 0,
        success: false,
        orderModalData: null,
        currentOrder: null
      },
      createOrderSlice: {
        order: [],
        isLoading: false,
        orderModalData: null,
        hasError: undefined,
        success: false
      },
      profileOrdersSlice: {
        orders: [],
        hasError: '',
        isLoading: false
      },
      updateTokensSlice: {
        isLoading: false,
        hasError: undefined
      }
    });
  });
});
