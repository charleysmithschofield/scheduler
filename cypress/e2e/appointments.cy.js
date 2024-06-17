describe("Appointments", () => {
  // Runs before each test in the block
  beforeEach(() => {
    // Resets the database to a known state before each test runs
    cy.request("GET", "/api/debug/reset");

    // Visits the root URL
    cy.visit("/");

    // Verifies that the page contains the text "Monday"
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Clicks the first "Add" button to start booking an appointment
    cy.get("[alt=Add]")
      .first()
      .click();

    // Types the student's name into the input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Selects the interviewer named "Sylvia Palmer"
    cy.get('[alt="Sylvia Palmer"]').click();

    // Clicks the "Save" button to save the appointment
    cy.contains("Save").click();

    // Verifies that the booked appointment is displayed with the student's name
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    // Verifies that the booked appointment is displayed with the interviewer's name
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it("should edit an interview", () => {
    // Clicks the "Edit" button to start editing the existing appointment
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
  
    // Clears the input field and types the new student's name "Lydia Miller-Jones"
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
  
    // Selects the interviewer named "Tori Malcolm"
    cy.get("[alt='Tori Malcolm']").click();
  
    // Clicks the "Save" button to save the edited appointment
    cy.contains("Save").click();
  
    // Verifies that the edited appointment is displayed with the updated student's name
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  
    // Verifies that the edited appointment is displayed with the updated interviewer's name
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Clicks the first "Delete" button to start deleting the existing apointment
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    // Clicks the "Confirm" button to confirm the deletion of the appointment
    cy.contains("Confirm").click();
  
    // Verifies that the "Deleting" indicator is shown, indicatin the deletion process has started
    cy.contains("Deleting").should("exist");
    // Verifies that the "Deleting" indicator is no longer displayed, indicating that the deletion process has completed
    cy.contains("Deleting").should("not.exist");
  
    // Verfies that the appointment card for "Archie Cohen" is no longer displayed, confirming the appointment has been successfully deleted
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});