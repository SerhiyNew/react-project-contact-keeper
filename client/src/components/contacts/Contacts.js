import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/ContactContext';
import Spinner from '../layout/Spinner';

import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please, add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered === null
            ? contacts.map(contact => (
                <CSSTransition
                  classNames='fade'
                  key={contact._id}
                  timeout={500}
                >
                  <ContactItem contact={contact}></ContactItem>
                </CSSTransition>
              ))
            : filtered.map(contact => (
                <CSSTransition
                  classNames='fade'
                  key={contact._id}
                  timeout={500}
                >
                  <ContactItem contact={contact}></ContactItem>
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
