describe("Testing our user onboarding form", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
  });
  it("Add test to inputs and submit form", function () {
    cy.get("#name").type("Gabriel").should("have.value", "Gabriel");
    cy.get("#email")
      .type("gabester78@gmail.com")
      .should("have.value", "gabester78@gmail.com");
    cy.get("#password").type("password").should("have.value", "password");
    cy.get("#checkbox").check().should("have.value", "on");
    cy.get("form").submit();
    cy.get("input").should("not.have.value");
  });
});
