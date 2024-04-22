describe("Testando dispositivos móveis", () => {
  beforeEach(() => {
      cy.visit("/");
  });

  context("Resolução 375x667px", () => {
      beforeEach(() => {
          cy.viewport(375, 667)
      })

      it("Deve existir um botão menu burguer", () => {
          cy.getByDataTest("botao-login").click();
          cy.getByDataTest("email-input").type("lucas@gmail.com");
          cy.getByDataTest("senha-input").type("123");
          cy.getByDataTest("botao-enviar").click();
  
          cy.location("pathname").should("eq", "/home");
  
          cy.getByDataTest("menu-burguer").click();
          cy.getByDataTest("menu-lateral").find("a").eq(3).click();
  
          cy.location("pathname").should("eq", "/home/servicos");
      });
  })
  
  context("Resolução i-Phone XR", () => {
      beforeEach(() => {
          cy.viewport("iphone-xr")
      })

      it("Deve existir o menu burguer", () => {
          cy.getByDataTest("botao-login").click();
          cy.getByDataTest("email-input").type("lucas@gmail.com");
          cy.getByDataTest("senha-input").type("123");
          cy.getByDataTest("botao-enviar").click();
  
          cy.location("pathname").should("eq", "/home");
  
          cy.getByDataTest("menu-burguer").should("be.visible")
      });
  })

  context("Resolução Macbook 13", () => {
      beforeEach(() => {
          cy.viewport('macbook-13');
      })

      it("Não deve aparecer o menu burguer", () => {
          cy.getByDataTest("botao-login").click();
          cy.getByDataTest("email-input").type("lucas@gmail.com");
          cy.getByDataTest("senha-input").type("123");
          cy.getByDataTest("botao-enviar").click();
  
          
          cy.location("pathname").should("eq", "/home");
  
          cy.getByDataTest("menu-burguer").should("not.be.visible")
      })
  })
})