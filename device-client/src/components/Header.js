import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Device Management App</h1>
      <hr />
      <div className="links">
        <NavLink to="/" className="link" activeClassName="active">
          Device List
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          Add Device
        </NavLink>
        <NavLink to="/transactionstats" className="link" activeClassName="active" exact>
          Transactions Stats-(Max/Min)
        </NavLink>
        <NavLink to="/transactionslist" className="link" activeClassName="active">
          Latest Transactions
        </NavLink>        
      </div>
    </header>
  );
};

export default Header;
