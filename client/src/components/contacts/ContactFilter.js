import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef(''); // useRef with empty string by default

  useEffect(() => {
    if (contactContext.filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      contactContext.filterContacts(e.target.value);
    } else {
      contactContext.clearFilter();
    }
  };
  return (
    <form>
      <input
        onChange={onChange}
        placeholder='Filter Contacts ...'
        ref={text}
        type='text'
      />
    </form>
  );
};

export default ContactFilter;
