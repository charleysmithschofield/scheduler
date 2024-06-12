// src/components/Appointment/index.js
import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


// Define mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const handleAddAppointment = () => {
    transition(CREATE);
  };

  const handleCancel = () => {
    back();
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  const interviewerId = props.interview && props.interview.interviewer && props.interview.interviewer.id;

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={handleAddAppointment} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => {
            console.log("Transitioning to EDIT mode");
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={handleCancel} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview ? props.interview.student : ""}
          interviewer={interviewerId}
          interviewers={props.interviewers}
          onCancel={handleCancel}
          onSave={save}
        />
      )}
      console.log(mode);
      {mode === SAVING && <Status message="Saving" />} 
      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={handleCancel}
          onConfirm={destroy}
        />
      )}
      {mode === ERROR_SAVE && <Error />}
      {mode === ERROR_DELETE && <Error />}
    </article>
  );
}
