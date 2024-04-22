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
    })
})