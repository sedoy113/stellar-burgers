describe('Конструктор бургеров', () => {
  const API_URL = 'https://norma.education-services.ru/api';

  const SELECTORS = {
    INGREDIENT_ITEM: '[data-cy="ingredient-item"]',
    MODAL: '[data-cy="modal"]',
    MODAL_CLOSE: '[data-cy="modal-close"]',
    INGREDIENT_BUN: '[data-cy="ingredient-bun"]',
    INGREDIENT_MAIN: '[data-cy="ingredient-main"]',
    CONSTRUCTOR_INGREDIENT: '[data-cy="constructor-ingredient"]',
    CONSTRUCTOR_PRICE: '[data-cy="constructor-price"]',
  };

  beforeEach(() => {
    cy.intercept('GET', `${API_URL}/ingredients`, { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('должен отображать страницу конструктора', () => {
    cy.contains('Соберите бургер').should('exist');
  });

  it('должен открывать модальное окно с деталями ингредиента', () => {
    cy.get(SELECTORS.INGREDIENT_ITEM).first().click();
    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.contains('Детали ингредиента').should('exist');
  });

  it('должен закрывать модальное окно по клику на оверлей', () => {
    cy.get(SELECTORS.INGREDIENT_ITEM).first().click();
    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('должен закрывать модальное окно по клику на крестик', () => {
    cy.get(SELECTORS.INGREDIENT_ITEM).first().click();
    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.get(SELECTORS.MODAL_CLOSE).click();
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('должен отображать данные именно того ингредиента в модальном окне', () => {
    cy.get(SELECTORS.INGREDIENT_ITEM).first().as('firstIngredient');

    cy.get('@firstIngredient')
      .find('[data-cy="ingredient-name"]')
      .invoke('text')
      .as('ingredientName');

    cy.get('@firstIngredient').click();

    cy.get('@ingredientName').then((name) => {
      cy.get(SELECTORS.MODAL).should('contain', name);
    });

    cy.get(SELECTORS.MODAL).within(() => {
      cy.contains('Калории').should('exist');
      cy.contains('Белки').should('exist');
      cy.contains('Жиры').should('exist');
      cy.contains('Углеводы').should('exist');
    });

    cy.get(SELECTORS.MODAL_CLOSE).click();
  });

  it('должен добавлять ингредиент в конструктор', () => {
    cy.get(SELECTORS.INGREDIENT_BUN).first().find('button').contains('Добавить').click();

    cy.get('[data-cy="constructor-bun-top"]').should('exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
  });

  it('должен добавлять начинку и соус в конструктор', () => {
    cy.get(SELECTORS.INGREDIENT_MAIN).first().find('button').contains('Добавить').click();

    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('have.length.at.least', 1);

    cy.get('[data-cy="ingredient-sauce"]').first().find('button').contains('Добавить').click();

    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('have.length.at.least', 2);
  });

  it('должен создавать заказ после авторизации и очищать конструктор', () => {
    cy.intercept('POST', `${API_URL}/auth/login`, { fixture: 'login.json' });
    cy.intercept('GET', `${API_URL}/auth/user`, { fixture: 'user.json' });
    cy.intercept('POST', `${API_URL}/orders`, { fixture: 'order.json' });

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');

    cy.get(SELECTORS.INGREDIENT_BUN).first().find('button').contains('Добавить').click();
    cy.get(SELECTORS.INGREDIENT_MAIN).first().find('button').contains('Добавить').click();

    cy.get('[data-cy="order-button"]').click();

    cy.get('[data-cy="order-modal"]').should('be.visible');
    cy.contains('идентификатор заказа').should('exist');

    cy.get(SELECTORS.MODAL_CLOSE).click();

    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('have.length', 0);
    cy.get(SELECTORS.CONSTRUCTOR_PRICE).should('contain', '0');

    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('должен перенаправлять на страницу логина если пользователь не авторизован', () => {
    cy.get(SELECTORS.INGREDIENT_BUN).first().find('button').contains('Добавить').click();

    cy.get('[data-cy="order-button"]').click();

    cy.url().should('include', '/login');
  });

  it('должен увеличивать счетчик ингредиента при добавлении', () => {
    cy.get(SELECTORS.INGREDIENT_MAIN).first().as('ingredient');
    cy.get('@ingredient').find('.counter').should('not.exist');

    cy.get('@ingredient').find('button').contains('Добавить').click();

    cy.get('@ingredient').find('.counter').should('exist');
  });

  it('должен удалять ингредиент из конструктора', () => {
    cy.get(SELECTORS.INGREDIENT_MAIN).first().find('button').contains('Добавить').click();

    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('have.length', 1);
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT)
      .first()
      .find('.constructor-element__action')
      .click();
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('have.length', 0);
  });

  it('должен пересчитывать общую стоимость при изменении состава', () => {
    cy.get(SELECTORS.CONSTRUCTOR_PRICE).should('contain', '0');

    cy.get(SELECTORS.INGREDIENT_BUN).first().find('button').contains('Добавить').click();
    
    cy.wait(200);
    cy.get(SELECTORS.CONSTRUCTOR_PRICE).invoke('text').then((initialPrice) => {
      const price = parseInt(initialPrice);
      expect(price).to.be.greaterThan(0);
    });

    cy.get(SELECTORS.INGREDIENT_MAIN).first().find('button').contains('Добавить').click();

    cy.wait(200);
    cy.get(SELECTORS.CONSTRUCTOR_PRICE).invoke('text').then((priceWithIngredient) => {
      cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT)
        .first()
        .find('.constructor-element__action')
        .click();

      cy.wait(200);
      cy.get(SELECTORS.CONSTRUCTOR_PRICE)
        .invoke('text')
        .should((newPrice) => {
          expect(newPrice).to.not.equal(priceWithIngredient);
        });
    });
  });
});
