import { isMobile } from '../support/utils'

describe('Testando múltiplas páginas', () => { 
  it('Deve conseguir acessar a página de minha conta' , () => {
    cy.efetuarLogin(Cypress.env('email'), Cypress.env('senha'))

    cy.visit('/home');

    cy.location('pathname').should('eq','/home')

    if (isMobile()) {
      cy.getByDataTest('menu-burguer').should('be.visible');
      cy.getByDataTest('menu-burguer').click();
      cy.getByDataTest('menu-lateral').find('a').eq(2).click();
    } else {
      cy.getByDataTest('app-home').find('a').eq(2).click();
    }

    cy.getByDataTest('titulo-cartoes').should('exist').and('contains.text', 'Meus cartões')
    cy.location('pathname').should('eq', '/home/cartoes')

  })
 })