describe("Teste de cadastro de usuário", () => {
    const usuario = {
        nome: "Mauz",
        email: "mauzzz@gmail.com",
        senha: "123"
    }
    it("Deve permitir cadastrar um usuário com sucesso", () => {
        cy.viewport(1920, 1080)
        cy.visit('/')
        cy.getByDataTest("botao-cadastro").click();
        cy.getByDataTest("nome-input").type(usuario.nome);
        cy.getByDataTest("email-input").type(usuario.email);
        cy.getByDataTest("senha-input").type(usuario.senha);
        cy.getByDataTest("checkbox-input").check();
        cy.getByDataTest("botao-enviar").click();

        cy.getByDataTest("mensagem-sucesso").should("exist").contains('Usuário cadastrado com sucesso!');

        cy.request('GET', 'http://localhost:8000/users').then(response => {
            expect(response.body).to.have.lengthOf.at.least(1)
            expect(response.body[response.body.length - 1]).to.deep.include(usuario)
        })
    })
})