import React, { useReducer } from 'react';
import * as uuid from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from '../types';

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
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //   ADD_CONTACT
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //   DELETE_CONTACT
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //   SET_CURRENT
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //   CLEAR_CURRENT
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //   UPDATE_CONTACT
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //   FILTER_CONTACT
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  //   CLEAR_FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        clearFilter,
        filterContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
