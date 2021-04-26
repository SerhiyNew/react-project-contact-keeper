import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please, add a contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered === null
          ? contacts.map(contact => (
              <CSSTransition classNames='fade' key={contact.id} timeout={500}>
                <ContactItem contact={contact}></ContactItem>
              </CSSTransition>
            ))
          : filtered.map(contact => (
              <CSSTransition classNames='fade' key={contact.id} timeout={500}>
                <ContactItem contact={contact}></ContactItem>
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
