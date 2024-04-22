describe('Formulario de Login', () => {
  it('Validação e-mail ou senha incorretos', () => {
    cy.visit("/");
    cy.getByDataTest('botao-login').click()
    cy.getByDataTest('email-input').type('lucasX@gmail.com')
    cy.getByDataTest('senha-input').type('123')
    cy.getByDataTest('botao-enviar').click()
    cy.get('span').should('exist').and('have.text', 'E-mail ou senha incorretos')
  })

  it("Deve acessar a página home", () => {
    cy.efetuarLogin('lucas@gmail.com', '123')
    cy.visit('/home')
    cy.getByDataTest('titulo-boas-vindas').should('contain', 'Bem vindo de volta!');
  })
})