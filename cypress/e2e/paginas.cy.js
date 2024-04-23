describe('Testando múltiplas páginas', () => { 
  it('Deve conseguir acessar a página de minha conta' , () => {
    cy.visit('/')
    cy.getByDataTest('botao-login').click()
    cy.getByDataTest('email-input').type('lucas@gmail.com')
    cy.getByDataTest('senha-input').type('123')
    cy.getByDataTest('botao-enviar').click()

    cy.location('pathname').should('eq','/home')

    cy.getByDataTest('app-home').find('a').eq(1).click()
    cy.get('h1').should('exist').and('contains.text', 'Minha conta')
    cy.location('pathname').should('eq', '/minha-conta')
  })
 })