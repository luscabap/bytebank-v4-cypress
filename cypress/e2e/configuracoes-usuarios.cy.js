import { faker } from '@faker-js/faker'

describe("Atualização de dados do usuário", () => {
    const novosDadosUsuario = {
        nome: faker.name.fullName(),
        senha: faker.internet.password()
    }
    it('Deve permitir o usuário atualizar seus dados', () => {
        cy.fixture('usuarios').as('usuarios');
        cy.get('@usuarios').then(usuario => {
            cy.efetuarLogin(usuario[0].email, usuario[0].senha);

            cy.visit('/home');
            cy.url().should('include', '/home');

            cy.contains(usuario[0].nome).should('be.visible');

            cy.getByDataTest('app-home').find('a').eq(1).click();
            cy.url().should('include', '/minha-conta');

            cy.getByDataTest('botao-salvar-alteracoes').should('be.disabled');
            cy.get('[name="nome"]').type(novosDadosUsuario.nome);
            cy.get('[name="senha"]').type(novosDadosUsuario.senha);
            cy.getByDataTest('botao-salvar-alteracoes').should('be.enabled');
            cy.getByDataTest('botao-salvar-alteracoes').click();

            cy.on('window:alert', (textoDoAlert) => {
                expect(textoDoAlert).to.equal("Alterações salvas com sucesso!");
            })

            cy.url().should('include', '/home');

            cy.window().then((win) => {
                expect(win.localStorage.getItem('nomeUsuario')).to.equal(novosDadosUsuario.nome);

                const userId = win.localStorage.getItem('userId');

                cy.request('GET', `http://localhost:8000/users/${userId}`).then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body.nome).to.be.equal(novosDadosUsuario.nome)
                    expect(response.body.senha).to.be.equal(novosDadosUsuario.senha)
                })
            })
        })
    })
})