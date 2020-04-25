export const getUsernameInput = () => cy.get('[data-cy=username-input');
export const getPasswordInput = () => cy.get('[data-cy=password-input');
export const getLoginBtn = () => cy.get('[data-cy=login-btn');
export const getShowUsername = () => cy.get('[data-cy=show-username]');
export const getUsernameList0 = () => cy.get('[data-cy=username-list0');
export const getPasswordList0 = () => cy.get('[data-cy=password-list0');
export const getErrorMsg = () => cy.get('[data-cy=error-msg]');

// Chat

export const getRoom1 = () => cy.get('[data-cy=room-btn-0');
export const getRoom2 = () => cy.get('[data-cy=room-btn-1]');
export const getChatInput = () => cy.get('[data-cy=chat-input]');
export const getChatSend = () => cy.get('[data-cy=chat-send]');
export const getMsg1 = () => cy.get('[data-cy=msg-0]');
