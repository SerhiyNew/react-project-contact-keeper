import React, { Fragment, useContext } from 'react';
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
      {filtered === null
        ? contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact}></ContactItem>
          ))
        : filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact}></ContactItem>
          ))}
    </Fragment>
  );
};

export default Contacts;
