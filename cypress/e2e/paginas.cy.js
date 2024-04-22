describe('Testando múltiplas páginas', () => { 
  it('Deve conseguir acessar a página de cartões' , () => {
    cy.visit('/')
    cy.getByDataTest('botao-login').click()
    cy.getByDataTest('email-input').type('neilton@alura.com')
    cy.getByDataTest('senha-input').type('123456')
    cy.getByDataTest('botao-enviar').click()

    cy.location('pathname').should('eq','/home')

    cy.getByDataTest('app-home').find('a').eq(1).click()
    cy.getByDataTest('titulo-cartoes').should('exist').and('have.text', 'Meus cartões')

    cy.location('pathname').should('eq', '/home/cartoes')
  })
 })