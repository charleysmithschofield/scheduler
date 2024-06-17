// Application.test.js
import React from "react";
import axios from "axios";
import { render, cleanup, fireEvent, getByText, prettyDOM, getAllByTestId, findByText, getByAltText, getByPlaceholderText, queryByText, findByAltText, queryByAltText, waitForElementToBeRemoved, waitFor, getAllByPlaceholderText } from "@testing-library/react";
import Application from "components/Application";

// Cleanup after each test to remove any leftover state
afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    // Render the Application component and extract necessary query functions
    const { queryByText, getByText, findByText } = render(<Application />);

    // Promise chain hidden using await to wait for "Monday" to appear
    await findByText("Monday");

    // Simulate a click on the "Tuesday" button and assert that "Leopold Silvers" is present after clicking "Tuesday"
    fireEvent.click(getByText("Tuesday"));
    expect(queryByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    // Promise chain hidden using await to wait for "Archie Cohen" to appear
    await findByText(container, "Archie Cohen");
  
    // Get all appointment elements in the container
    const appointments = getAllByTestId(container, "appointment");
    // Select the first appointment
    const appointment = appointments[0];
  
    // Simulate a click on the "Add" button in the first appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Simulate typing a student's name in the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // Simulate selecting an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // Simulate clicking the "Save" button
    fireEvent.click(getByText(appointment, "Save"));
  
    // Assert that the "Saving" indicator is displayed    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until the "Saving" indicator is removed and confirm that the student's name is displayed
    await findByText(appointment, "Lydia Miller-Jones");

    // Find the specific day node that contains the text "Monday"
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    // Verify that "Monday" day also displays "no spots remaining"
    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
  });

  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // Render the Application.
    const { container } = render(<Application />);
  
    // Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");
  
    // Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  
    // Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // Wait until the element with the "Add" button is displayed.
    await findByAltText(appointment, "Add");
  
    // Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });


 it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render the Application.
    const { container, debug } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");

    // Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Logen Ninefingers" },
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait for the newly added student's name to appear in the appointment 
    await findByText(appointment, "Logen Ninefingers");

    // Click the "Edit" button
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // Change the student name from "Logen Ninefingers" to "Sand dan Glokta"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Sand dan Glokta" },
    });

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });



  // // BEFORE LARRYS "HELP"
  // it("shows the save error when failing to save an appointment", async () => {
  //   // Mock display error message
  //   axios.put.mockRejectedValueOnce(new Error("Could not save appointment"));

  //   // Render the Application.
  //   const { container, debug } = render(<Application />);

  //   // Wait until the text "Archie Cohen" is displayed.
  //   await findByText(container, "Archie Cohen");

  //   // Click the "Add" button on the first empty appointment.
  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0];

  //   fireEvent.click(getByAltText(appointment, "Add"));

  //   // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" },
  //   });

  //   // Click the first interviewer in the list.
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
  //   // Click the "Save" button on that same appointment.
  //   fireEvent.click(getByText(appointment, "Save"));
    
  //   // Check that the saving error message is displayed.
  //   await findByText(appointment, "Could not save appointment");
    
  //   debug();

  // });

  // it("shows the delete error when failing to delete an existing appointment", async () => {
  //   axios.delete.mockRejectedValueOnce(new Error("Could not delete appointment"));

  //   // Render the Application.
  //   const { container, debug } = render(<Application />);

  //   // Wait until the text "Archie Cohen" is displayed.
  //   await findByText(container, "Archie Cohen");

  //   // Click the "Delete" button on the booked appointment.
  //   const appointment = getAllByTestId(container, "appointment").find((appointment) =>
  //     queryByText(appointment, "Archie Cohen")
  //   );

  //   fireEvent.click(queryByAltText(appointment, "Delete"));

  //   // Check that the confirmation message is shown.
  //   expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  //   // Click the "Confirm" button on the confirmation.
  //   fireEvent.click(queryByText(appointment, "Confirm"));

  //   // Check that the saving error message is displayed.
  //   await findByText(appointment, "Could not delete appointment");

  //   debug();
  // });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce(new Error("Could not save appointment"));
  
    const { container, debug } = render(<Application />);
  
    await findByText(container, "Archie Cohen");
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
  
    // `debug()` after click actions
    debug();
  
    await findByText(appointment, "Could not save appointment");
  
    // Final debug before assertion
    debug();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Could not delete appointment"));
  
    const { container, debug } = render(<Application />);
  
    await findByText(container, "Archie Cohen");
  
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // `debug()` after clicking confirm
    debug();
  
    await findByText(appointment, "Could not delete appointment");
  
    // Final debug before assertion
    debug();
  });
});