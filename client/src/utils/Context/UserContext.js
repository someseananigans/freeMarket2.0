import React from 'react';

const UserContext = React.createContext({
  customer: {},
  setCustomer: () => { }
})

export default UserContext;
