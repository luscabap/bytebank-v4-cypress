describe('Jornadas de usuário', () => {
  const novaTransacao = {
    tipoTransacao: 'Depósito',
    valor: '105'
  }

  it('Deve permitir que a pessoa usuária acesse a aplicação, realize uma transação e faça um logout', () => {
    cy.visit('/');
    cy.fixture('usuarios').as('usuarios');
    cy.get('@usuarios').then((usuario) => {
      cy.getByDataTest('botao-login').click();
      cy.getByDataTest('email-input').type(usuario[1].email);
      cy.getByDataTest('senha-input').type(usuario[1].senha);
      cy.getByDataTest('botao-enviar').click();

      cy.location('pathname').should('eq', '/home');

      cy.getByDataTest('select-opcoes').select(novaTransacao.tipoTransacao);
      cy.getByDataTest('form-input').type(novaTransacao.valor);
      cy.getByDataTest('realiza-transacao').click();

      cy.getByDataTest('lista-transacoes')
        .find('li')
        .last()
        .contains(novaTransacao.valor);


      cy.window().then(win => {
        const userId = win.localStorage.getItem('userId');

        cy.request({
          method: 'GET',
          url: `http://localhost:8000/users/${userId}/transations`,
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.lengthOf.at.least(1);
          expect(response.body[response.body.length - 1]).to.deep.include(novaTransacao)
        })
      }) 

    });
  });
});
