import React, { useReducer } from 'react';
//import uuid from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
// import {
//   ADD_CONTACT,
//   DELETE_CONTACT,
//   SET_CURRENT,
//   CLEAR_CURRENT,
//   UPDATE_CONTACT,
//   FILTER_CONTACT,
//   CLEAR_FILTER,
// } from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'First Name',
        email: 'First@gmail.com',
        phone: '111-111-111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Second Name',
        email: 'Second@gmail.com',
        phone: '222-222-222',
        type: 'professional',
      },
      {
        id: 3,
        name: 'Third Name',
        email: 'Third@gmail.com',
        phone: '333-333-333',
        type: 'personal',
      },
    ],
  };
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //   ADD_CONTACT
  //   DELETE_CONTACT
  //   SET_CURRENT
  //   CLEAR_CURRENT
  //   UPDATE_CONTACT
  //   FILTER_CONTACT
  //   CLEAR_FILTER

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;