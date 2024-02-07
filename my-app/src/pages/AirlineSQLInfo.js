import React, { useState, useEffect } from 'react';
import { get } from '../services/authService';
import './AirlineSQLInfo.css'

const AirlineSQLInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await get('/data/vuelos');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to process and answer the questions based on the fetched data
  const processSQLData = () => {
    if (!data || data.length === 0) return {};

    // 1. Airport with the most movements
    const airportMovements = data.reduce((acc, vuelo) => {
      acc[vuelo.nombre_aeropuerto] = (acc[vuelo.nombre_aeropuerto] || 0) + 1;
      return acc;
    }, {});
    const mostActiveAirport = Object.keys(airportMovements).reduce((a, b) => airportMovements[a] > airportMovements[b] ? a : b);

    // 2. Airline with the most flights
    const airlineFlights = data.reduce((acc, vuelo) => {
      acc[vuelo.nombre_aerolinea] = (acc[vuelo.nombre_aerolinea] || 0) + 1;
      return acc;
    }, {});
    const mostActiveAirline = Object.keys(airlineFlights).reduce((a, b) => airlineFlights[a] > airlineFlights[b] ? a : b);

    // 3. Day with the most flights
    const flightsByDay = data.reduce((acc, vuelo) => {
      const day = vuelo.dia; // Assuming 'dia' is already in 'YYYY-MM-DD' format
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
    const busiestDay = Object.keys(flightsByDay).reduce((a, b) => flightsByDay[a] > flightsByDay[b] ? a : b);

    // 4. Airlines with more than 2 flights per day
    const flightsPerDayPerAirline = data.reduce((acc, { nombre_aerolinea, dia }) => {
      acc[dia] = acc[dia] || {};
      acc[dia][nombre_aerolinea] = (acc[dia][nombre_aerolinea] || 0) + 1;
      return acc;
    }, {});

    const airlinesMoreThanTwoFlightsPerDay = new Set();
    Object.values(flightsPerDayPerAirline).forEach(day => {
      Object.entries(day).forEach(([airline, flights]) => {
        if (flights > 2) airlinesMoreThanTwoFlightsPerDay.add(airline);
      });
    });

    return {
      mostActiveAirport,
      mostActiveAirline,
      busiestDay,
      airlinesMoreThanTwoFlightsPerDay: Array.from(airlinesMoreThanTwoFlightsPerDay)
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
            <div className="sql-answer">{airlinesMoreThanTwoFlightsPerDay.length > 0 ? airlinesMoreThanTwoFlightsPerDay.join(', ') : "There are no airlines with more than 2 flights per day."}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirlineSQLInfo;
