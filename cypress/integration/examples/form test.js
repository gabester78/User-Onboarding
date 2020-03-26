describe("Testing our user onboarding form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/");
  });
  it("Add test to inputs and submit form", function() {
    cy.get('input[name="name"]').type("Gabriel");
    cy.get('input[name="email"]').type("Bigpoppapump@flex.com");
    cy.get('input[name="motivation"]').type("swolemaster");
    cy.get(".terms > input")
      .check()
      .should("have.value", "on");
    cy.get("form").submit();
    cy.get("input").should("not.have.value");
  });
});
