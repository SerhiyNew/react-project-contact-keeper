import React from 'react';
import Contacts from '../contacts/Contacts';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <Contacts></Contacts>
      </div>
    </div>
  );
};

export default Home;
