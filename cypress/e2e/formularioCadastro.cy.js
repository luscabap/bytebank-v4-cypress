describe('Formulário Cadastro', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000')
  })

  it('Usuário deve conseguir se cadastrar com sucesso', ()=>{
    cy.getByDataTest('botao-cadastro').click()
    cy.getByDataTest('nome-input').type('Bruno')
    cy.getByDataTest('email-input').type('bruno@gmail.com')
    cy.getByDataTest('senha-input').type('123')
    cy.getByDataTest('checkbox-input').click()
    cy.getByDataTest('botao-enviar').click()
    cy.getByDataTest('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
  })
})