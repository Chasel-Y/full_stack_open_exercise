describe("Blog_list app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("apiUrl")}/testing/reset`);
    const user = {
      name: "chasel",
      username: "chasel1",
      password: "chasel1",
    };
    const user2 = {
      name: "chaselII",
      username: "chasel2",
      password: "chasel2",
    };
    cy.request("POST", `${Cypress.env("apiUrl")}/users`, user);
    cy.request("POST", `${Cypress.env("apiUrl")}/users`, user2);
    cy.visit("");
  });
  it("Login form is shown", function () {
    cy.contains("log in").click();
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("chasel1");
      cy.get("#password").type("chasel1");
      cy.get("#login-button").click();
      cy.contains("chasel logged in");
    });
    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("chasel1");
      cy.get("#password").type("chasel777");
      cy.get("#login-button").click();
      cy.contains("Error: wrong username or password");
      cy.get(".error").should("contain", "Error: wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "chasel1", password: "chasel1" });
    });
    it("A blog can be created", function () {
      cy.contains("create blog").click();
      cy.get("#title").type("test blog1");
      cy.get("#author").type("test author1");
      cy.get("#url").type("test url1");
      cy.get("#blogSubmit").click();
      cy.get(".inform").should(
        "contain",
        "a new blog test blog1 added by test author1"
      );
      cy.get(".inform").should("have.css", "color", "rgb(0, 128, 0)");
      cy.contains("test blog1 - test author1");
    });
    describe("Some blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test blog1",
          author: "test author1",
          url: "test url1",
        });
        cy.createBlog({
          title: "test blog2",
          author: "test author2",
          url: "test url2",
        });
        cy.createBlog({
          title: "test blog3",
          author: "test author3",
          url: "test url3",
        });
      });
      it("A blog can be liked", function () {
        cy.contains("test blog1 - test author1").contains("view").click();
        cy.contains("test blog1 - test author1")
          .parent()
          .parent()
          .contains("like")
          .click();
        cy.get(".inform").should(
          "contain",
          "test blog1 get a like from chasel"
        );
        cy.get(".inform").should("have.css", "color", "rgb(0, 128, 0)");
        cy.contains("likes 1");
      });
      it("the user who created a blog can delete it", function () {
        cy.contains("test blog1 - test author1").contains("view").click();
        cy.contains("test blog1 - test author1")
          .parent()
          .parent()
          .contains("remove")
          .click();
        cy.get(".inform").should("contain", "test blog1 removed by chasel");
        cy.get(".inform").should("have.css", "color", "rgb(0, 128, 0)");
        cy.get("html").should("not.contain", "test blog1 - test author1");
      });
      it("only the creator can see the delete button of a blog", function () {
        cy.contains("logout").click();
        cy.login({ username: "chasel2", password: "chasel2" });
        cy.contains("test blog1 - test author1").contains("view").click();
        cy.contains("test blog1 - test author1")
          .parent()
          .parent()
          .should("not.contain", "remove");
      });
      it("blogs are ordered according to likes", function () {
        cy.contains("test blog2 - test author2").contains("view").click();
        cy.contains("test blog2 - test author2")
          .parent()
          .parent()
          .contains("like")
          .click();
        cy.contains("test blog3 - test author3").contains("view").click();
        cy.contains("test blog3 - test author3")
          .parent()
          .parent()
          .contains("like")
          .click();
        cy.contains("test blog3 - test author3")
          .parent()
          .parent()
          .contains("like")
          .click();
        cy.get(".blog").eq(0).should("contain", "test blog3 - test author3");
        cy.get(".blog").eq(1).should("contain", "test blog2 - test author2");
        cy.get(".blog").eq(2).should("contain", "test blog1 - test author1");
      });
    });
  });
});
