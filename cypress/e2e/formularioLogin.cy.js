describe('Formulario de Login', () => {
  it('Validação e-mail ou senha incorretos', () => {
    cy.visit("/");
    cy.getByDataTest('botao-login').click()
    cy.getByDataTest('email-input').type('lucasX@gmail.com')
    cy.getByDataTest('senha-input').type('123')
    cy.getByDataTest('botao-enviar').click()
    cy.get('span').should('exist').and('have.text', 'E-mail ou senha incorretos')
  })

  it('teste', () => {
    cy.visit('/')
  })

  it("Deve acessar a página home", () => {
    cy.efetuarLogin('lucas@gmail.com', '123')
    cy.visit('/home')
    cy.getByDataTest('titulo-boas-vindas').should('contain', 'Bem vindo de volta!');
  })

  it("Deve acessar a página home", () => {
    cy.fixture('usuarios').then(response => {
      response.map(usuario => (
        cy.efetuarLogin(usuario.email, usuario.senha), 
        cy.visit('/home'),
        cy.url().should('include', '/home'),
        cy.getByDataTest('titulo-boas-vindas').should('contain', 'Bem vindo de volta!'),
        cy.contains(usuario.nome).should('be.visible')
    ))
    })
  })

  it.only("Deve exibir todas as informações do usuário corretamente", () => {
    cy.fixture('usuariosCompletos.json').then(response => {
      cy.efetuarLogin(response.email, response.senha);
      cy.visit('/home')
      cy.url().should('contain', '/home')
      cy.getByDataTest('titulo-boas-vindas').should('exist')

      cy.contains(response.nome).should('be.visible')

      cy.getByDataTest('lista-transacoes').find('li').last()
      .contains(response.transacoes[response.transacoes.length - 1].valor)

      cy.get('[data-testid="saldo"]').contains(response.saldo)

    })
  })
})