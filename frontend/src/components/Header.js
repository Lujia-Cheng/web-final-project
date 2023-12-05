import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        {/* Other links */}
        <Link to="/login">Login</Link>
        {/* Add more navigation links */}
      </nav>
    </header>
  );
}

export default Header;
