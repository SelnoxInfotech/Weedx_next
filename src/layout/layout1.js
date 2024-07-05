import React from 'react';
import Createcontext from '../hooks/context';
const Layout2 = ({ children }) => {
    const {state , dispatch} =  React.useContext(Createcontext)
  return (
    <div>
      <header>Header for Layout 1</header>
      <main>{children}</main>
      <footer>Footer for Layout 1</footer>
    </div>
  );
};

export default Layout2;