import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContaxtContext from '../../context/contact/ContactContext';

const ContactItem = ({ contact }) => {
  const contaxtContext = useContext(ContaxtContext);
  const { id, name, email, phone, type } = contact;
  const { deleteContact, setCurrent, clearCurrent } = contaxtContext;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        {'  '}
        <span
          style={{ float: 'right' }}
          className={
            'badge' +
            ' ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i>
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          onClick={() => setCurrent(contact)} //  contact comming from the Props
          className='btn btn-dark btn-sm'
        >
          Edit
        </button>
        <button onClick={onDelete} className='btn btn-danger btn-sm'>
          Delit
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
