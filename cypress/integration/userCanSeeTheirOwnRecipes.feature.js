/* eslint-disable no-undef */
describe("User can see their personal page", () => {
  before(() => {
    cy.intercept("GET", "api/recipes*", {
      fixture: "myRecipesResponse.json"
    }).as("MyRecipes");
    cy.visitAndAuthenticate();
    cy.get("[data-cy=my-recipes]").click();
  });

  it("is expected to make a GET request to the API filtered by the users recipes", () => {
    cy.wait("@MyRecipes").its("request.method").should("eq", "GET");
  });

  it("is expected to see collection of recipes", () => {
    cy.get("[data-cy=current-user-recipes]").should("have.length", 3);
  });

  it("is expected to see recipe name", () => {
    cy.get("[data-cy=current-user-recipes]")
      .children()
      .first()
      .within(() => {
        cy.get("[data-cy=recipe-name]").should("contain", "Souvlaki");
      });
  });

  describe("User can click on their own recipes", () => {
    before(() => {
      cy.intercept("GET", "api/recipes*", {
        fixture: "myRecipesResponse.json"
      }).as("MyRecipes");
      cy.visit("/my-recipes");
      cy.get("[data-cy=recipe-collection]").children().first().click();
    });

    it("is expected to view single recipe when you click on recipe card", () => {
      cy.get("[data-cy=recipe-name]").should("contain", "Souvlaki");
    });

    it("is expected to see description body", () => {
      cy.get("[data-cy=description-body]").should(
        "contain",
        "Granny Smith apples mixed with brown sugar and butter filling, in a flaky all-butter crust, with ice cream."
      );
    });
  });
});
