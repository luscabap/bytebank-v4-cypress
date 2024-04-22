Cypress.Commands.add('getByDataTestCy', (nomeDataCy) => {
  return cy.get(`[data-cy=${nomeDataCy}]`)
})

Cypress.Commands.add('getByDataTest', (nomeDataTest) => {
  return cy.get(`[data-test=${nomeDataTest}]`)
})

Cypress.Commands.add('verificaTextoDoSeletor', (seletor, texto) => {
  cy.get(`[data-cy=${seletor}]`).contains(texto)
})