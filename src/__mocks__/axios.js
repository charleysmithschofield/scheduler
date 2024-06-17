// __mocks__/axios.js

/* Mock data for days, appointments, and interviewers */
const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1,
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 },
    },
    4: { id: 4, time: "3pm", interview: null },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    4: {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg",
    },
  },
};

/* Mock axios object */
export default {
  /* Default configuration */
  defaults: { baseURL: "" },

  /* Mocking the GET method */
  get: jest.fn((url) => {
    if (url === "/api/days") {
      /* Resolve days data */
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days,
      });
    }

    if (url === "/api/appointments") {
      /* Resolve appointments data */
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.appointments,
      });
    }

    if (url === "/api/interviewers") {
      /* Resolve interviewers data */
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.interviewers,
      });
    }
  }),

  /* Mocking the PUT method */
  put: jest.fn((url, data) => {
    /* Returning a resolved promise with status 204 and statusText "No Content" */
    return Promise.resolve({
      status: 204,
      statusText: "No Content",
    });
  }),

  /* Mocking the DELETE method */
  delete: jest.fn((url) => {
    /* Returning a resolved promise with status 204 and statusText"No Content" */
    return Promise.resolve({
      status: 204,
      statusText: "No Content",
    });
  }),

  // // Mock display error message
  // put: jest.fn((url, data) => {
  //   /* Returning a rejected promise with a statusText "Could not save appointment"*/
  //   return Promise.reject({
  //     statusText: "Could not save appointment"
  //   })
  // }),

  //  // Mock display error message
  //  delete: jest.fn((url, data) => {
  //   /* Returning a rejected promise with a statusText "Could not save appointment"*/
  //   return Promise.reject({
  //     statusText: "Could not delete appointment"
  //   })
  // })
};