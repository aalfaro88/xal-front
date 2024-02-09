import React, { useState, useEffect } from 'react';
import { get } from '../services/authService';
import './AirlineSQLInfo.css';

const AirlineSQLInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await get('/data/vuelos'); //CHECK RESPONSE
        console.log(response)
        setData(response.data || []); // Ensure data is always an array
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processSQLData = () => {
    if (!data || data.length === 0) return {
      mostActiveAirport: 'Not available',
      mostActiveAirline: 'Not available',
      busiestDay: 'Not available',
      airlinesMoreThanTwoFlightsPerDay: [],
    };

    const airportMovements = data.reduce((acc, vuelo) => {
      acc[vuelo.nombre_aeropuerto] = (acc[vuelo.nombre_aeropuerto] || 0) + 1;
      return acc;
    }, {});
    const mostActiveAirport = Object.keys(airportMovements).reduce((a, b) => airportMovements[a] > airportMovements[b] ? a : b, '');

    const airlineFlights = data.reduce((acc, vuelo) => {
      acc[vuelo.nombre_aerolinea] = (acc[vuelo.nombre_aerolinea] || 0) + 1;
      return acc;
    }, {});
    const mostActiveAirline = Object.keys(airlineFlights).reduce((a, b) => airlineFlights[a] > airlineFlights[b] ? a : b, '');

    const flightsByDay = data.reduce((acc, vuelo) => {
      const day = vuelo.dia; // Assuming 'dia' is already in 'YYYY-MM-DD' format
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
    const busiestDay = Object.keys(flightsByDay).reduce((a, b) => flightsByDay[a] > flightsByDay[b] ? a : b, '');

    const flightsPerDayPerAirline = data.reduce((acc, { nombre_aerolinea, dia }) => {
      acc[dia] = acc[dia] || {};
      acc[dia][nombre_aerolinea] = (acc[dia][nombre_aerolinea] || 0) + 1;
      return acc;
    }, {});

    const airlinesMoreThanTwoFlightsPerDay = Object.entries(flightsPerDayPerAirline).reduce((acc, [day, airlines]) => {
      Object.entries(airlines).forEach(([airline, flights]) => {
        if (flights > 2) acc.add(airline);
      });
      return acc;
    }, new Set());

    return {
      mostActiveAirport,
      mostActiveAirline,
      busiestDay,
      airlinesMoreThanTwoFlightsPerDay: Array.from(airlinesMoreThanTwoFlightsPerDay),
    };
  };

  const { mostActiveAirport, mostActiveAirline, busiestDay, airlinesMoreThanTwoFlightsPerDay } = processSQLData();

  return (
    <div className="airline-sql-section">
      <div className="title-api">
        <h2>Airline SQL Info</h2>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="error-message">
          <p>Error loading data: {error.message}</p>
        </div>
      ) : (
        <div className="sql-question-section">
          <div className="sql-question-container">
            <div className="sql-question">1. Airport with most movements:</div>
            <div className="sql-answer">{mostActiveAirport}</div>
          </div>
          <div className="sql-question-container">
            <div className="sql-question">2. Airline with most flights:</div>
            <div className="sql-answer">{mostActiveAirline}</div>
          </div>
          <div className="sql-question-container">
            <div className="sql-question">3. Day with most flights:</div>
            <div className="sql-answer">{busiestDay}</div>
          </div>
          <div className="sql-question-container">
            <div className="sql-question">4. Airlines with more than 2 flights per day:</div>
            <div className="sql-answer">
              {airlinesMoreThanTwoFlightsPerDay.length > 0 ? airlinesMoreThanTwoFlightsPerDay.join(', ') : "There are no airlines with more than 2 flights per day."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirlineSQLInfo;
