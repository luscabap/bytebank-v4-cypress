describe("Realizando requisições para a API", () => {
    context("GET /users", () => {
        it("Deve retornar uma lista de usuários", () => {
            cy.request('GET', 'http://localhost:8000/users').then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).length.to.be.greaterThan(1)
            })
        })
    });
    
    context("GET /users/:userId", () => {
        it("Deve retornar um único usuário", () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/users/d3d65951-e17c-4882-ac00-2f36324ba35d'
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('nome')
            });
        })
        it("Deve retornar erro quando o id do usuário for invalido", () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/users/idInválido',
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body).to.eq('Not Found')
            })
        })
    });

    context("Interceptando solicitações de rede", () => {
        it("Deve fazer a interceptação do método POST para a rota users/login", () => {
            Cypress.session.clearAllSavedSessions();
            cy.intercept('POST', 'users/login').as("loginRequest");
            cy.efetuarLogin("lucas@gmail.com", '123');
            cy.wait('@loginRequest').then((interception) => {
                interception.response = {
                    statusCode: 200,
                    body: {
                        sucess: true,
                        message: "Login bem sucedido"
                    }
                }
            })
            cy.visit('/home')

            cy.getByDataTest("titulo-boas-vindas").should('contain.text', 'Bem vindo de volta!')
        })
    })
})