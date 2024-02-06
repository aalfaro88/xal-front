import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App">
      <div className="App-header">
        <div className='App-section'>
          <Link to="/stackexchange"> {/* Wrap the logo with a Link */}
            <img src="/logo-react.png" alt="React Logo" className='logo-img-react' />
          </Link>
          <h1>+</h1>
          <Link to="/airlinesqlinfo"> {/* Wrap the logo with a Link */}
            <img src="/logo-flask.png" alt="Flask Logo" className='logo-img-flask' />
          </Link>
        </div>
        <div className='App-links-container'>
          <Link to="/stackexchange" className='App-link'>Stack Exchange API</Link>
          <Link to="/airlinesqlinfo" className='App-link'>Airline SQL Info</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
