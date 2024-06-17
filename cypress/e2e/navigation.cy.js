describe("Navigation", () => {
  it("should visit root", () => {
    // Visit the root URL
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    // Visit the root URL
    cy.visit("/");
  
    // Find and click on the list item with the data-testid="day" and contains "Tuesday"
    cy.contains("[data-testid=day]", "Tuesday")
      // Simulate a click action
      .click() 
      // Asser that the list item is selected
      .should("have.class", "day-list__item--selected")
  });
});