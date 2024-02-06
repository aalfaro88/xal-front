import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className="App">
      <div className="App-header">
        <div className='App-section'>
          <div className='logo-left'>
            <img src="/logo-react.png" alt="" className='logo-img-react' />
          </div>
          <div className='logo-center'>
            <h1>+</h1>
          </div>
          <div className='logo-right'>
            <img src="/logo-flask.png" alt="" className='logo-img-flask' />
          </div>
        </div>
        <div className='App-description'>
          <p>This application serves as a frontend interface to interact with our RESTful API. Here, you can access data about Stack Exchange questions and airline information based on the technical requirements specified.<br /> <br /> Navigate using the links above to explore detailed data visualizations and insights derived from Stack Exchange and our custom SQL database.</p>
        </div>
        <div className='App-links-container'>
          <Link to="/stackexchange" className='App-link'>
            Stack Exchange API
          </Link>
          <Link to="/airlinesqlinfo" className='App-link'>
            Airline SQL Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
