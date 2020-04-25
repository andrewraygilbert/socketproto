import {
  getUsernameInput,
  getPasswordInput,
  getLoginBtn,
  getShowUsername,
  getUsernameList0,
  getPasswordList0,
  getRoom1,
  getRoom2,
  getChatInput,
  getChatSend,
  getMsg1,
  getErrorMsg,
} from '../support/app.po';

const loginFn = () => {
  getUsernameInput().type('Bilbo');
  getPasswordInput().type('secret');
  getLoginBtn().click();
};

const chatMsg = 'Hello, here is my message';


describe('login', () => {
  beforeEach(() => cy.visit('/'));

  it('login btn should be disabled without credentials', () => {
    getLoginBtn()
      .should('to.be', 'disabled')
  })

  it('should fail to login with invalid creds', () => {
    getUsernameInput().type('BoBo')
    getPasswordInput().type('Bobo')
    getLoginBtn().click()
    getErrorMsg()
  })

  // verify that login works properly
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

  // verify that users list displays properly
  it('should display the users in the database', () => {
    getUsernameList0()
      .should('contain', ['Bilbo'])
    getPasswordList0()
      .should('contain', 'secret')
  })
});

describe('chat', () => {
  beforeEach(() => {
    cy.visit('/')
    loginFn()
  });

  // verify that rooms display
  it('should display available rooms', () => {
    getRoom1()
      .should('contain', 'Room1')
      .and('have.class', 'badge-secondary')
  })

  // should change rooms when room selected
  it('should join room when clicked', () => {
    getRoom1()
      .click()
      .should('have.class', 'badge-success')
  })

  it('should switch rooms', () => {
    getRoom1()
      .click()
    getRoom2()
      .click()
      .should('have.class', 'badge-success')
  })

  it('should add chat message to chat box', () => {
    getRoom1()
      .click()
    getChatInput()
      .type(chatMsg)
    getChatSend()
      .click()
    getMsg1()
      .should('contain', chatMsg)
  })

})
