import { getUsernameInput,
getPasswordInput,
getLoginBtn,
getShowUsername, } from '../support/app.po';

describe('socketproto', () => {
  beforeEach(() => cy.visit('/'));

  it('should change to chat after login', () => {
    // Function helper example, see `../support/app.po.ts` file
    getUsernameInput().type('Bilbo')
    getPasswordInput().type('secret')
    getLoginBtn().click()
    cy.url()
      .should('include', '/chat')
    getShowUsername()
      .should('contain', 'Bilbo')
  });
});
