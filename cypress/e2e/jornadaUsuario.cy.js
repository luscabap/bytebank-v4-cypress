describe('Jornadas de usuário', () => {
  it('Deve permitir que a pessoa usuária acesse a aplicação, realize uma transação e faça um logout', () => {
    cy.visit('/');

    cy.getByDataTest('botao-login').click();
    cy.getByDataTest('email-input').type('lucas@gmail.com');
    cy.getByDataTest('senha-input').type('123');
    cy.getByDataTest('botao-enviar').click();

    cy.location('pathname').should('eq', '/home');

    cy.getByDataTest('select-opcoes').select('Transferência');
    cy.getByDataTest('form-input').type('80');
    cy.getByDataTest('realiza-transacao').click();

    cy.getByDataTest('lista-transacoes').find('li').last().contains('- R$ 80');

    cy.getByDataTest('botao-sair').click();
    cy.location('pathname').should('eq', '/');
  });
});
