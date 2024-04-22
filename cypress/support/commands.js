Cypress.Commands.add('getByDataTestCy', (nomeDataCy) => {
  return cy.get(`[data-cy=${nomeDataCy}]`)
});

Cypress.Commands.add('getByDataTest', (nomeDataTest) => {
  return cy.get(`[data-test=${nomeDataTest}]`)
});

Cypress.Commands.add('verificaTextoDoSeletor', (seletor, texto) => {
  cy.get(`[data-cy=${seletor}]`).contains(texto)
});

Cypress.Commands.add("efetuarLogin", (email, senha) => {
  cy.session([email, senha], () => {
    cy.visit("/");
    cy.getByDataTest('botao-login').click();
    cy.getByDataTest('email-input').type(email);
    cy.getByDataTest('senha-input').type(senha);
    cy.getByDataTest('botao-enviar').click();
    cy.url().should('contain', '/home');
  })
})