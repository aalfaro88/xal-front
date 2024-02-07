import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { get } from '../services/authService';
import './StackExchange.css';

const StackExchange = () => {
  const [data, setData] = useState({}); 
  const [tableData, setTableData] = useState([]); 
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortBy, setSortBy] = useState('last_activity_date'); 

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStackExchange = await get('/stackexchange');
        const responseAnsweredUnanswered = await get('/stackexchange/answered-unanswered');
        const responseHighestReputation = await get('/stackexchange/highest-reputation');
        const responseFewestViews = await get('/stackexchange/fewest-views');
        const responseOldestRecent = await get('/stackexchange/oldest-recent');

        setData({
          answeredUnanswered: responseAnsweredUnanswered.data,
          highestReputation: responseHighestReputation.data,
          fewestViews: responseFewestViews.data,
          oldestRecent: responseOldestRecent.data,
        });
        setTableData(responseStackExchange.data.items);
        setIsLoading(false); // Data is loaded, set isLoading to false

        // Console log the results
        console.log("Pregunta 1: Respuestas contestadas y no contestadas:", responseAnsweredUnanswered.data);
        console.log("Pregunta 2: Respuesta con mayor reputación:", responseHighestReputation.data);
        console.log("Pregunta 3: Respuesta con menor número de vistas:", responseFewestViews.data);
        console.log("Pregunta 4: Respuesta más vieja y más actual:", responseOldestRecent.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        setIsLoading(false); // Error occurred, set isLoading to false
      }
    };

    fetchData();
}, []);

  // Sorting data
  const sortData = useCallback((dataToSort) => {
    return [...dataToSort].sort((a, b) => {
      let valueA, valueB;
      if (sortBy === 'reputation' || sortBy === 'view_count') {
        valueA = parseInt(a[sortBy] || '0', 10);
        valueB = parseInt(b[sortBy] || '0', 10);
      } else if (sortBy === 'creation_date') {
        valueA = new Date(a[sortBy] * 1000);
        valueB = new Date(b[sortBy] * 1000);
      } else {
        // Convert to string for comparison
        valueA = a[sortBy]?.toString() || '';
        valueB = b[sortBy]?.toString() || '';
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
  
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }, [sortOrder, sortBy]); // Dependencies for useCallback

  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortBy = (key) => {
    setSortBy(key);
    toggleSortOrder();
    const sortedData = sortData(tableData);
    setTableData(sortedData);
  };

  const renderTableRows = () => {
    return tableData.map((item, index) => (
      <tr key={index}>
        <td>{item.title}</td>
        <td>{new Date(item.creation_date * 1000).toLocaleString()}</td>
        <td>{item.owner.reputation}</td>
        <td>{item.view_count}</td>
        <td>{item.is_answered ? 'Yes' : 'No'}</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className='title-api'>
        <h1>Stack Exchange API</h1>
        <h2>Relevant Data</h2>
      </div>
      <div className='question-section'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="question-container">
              <div className="question">Number of answered and unanswered questions</div>
              <div className="answer"><b>Answered:</b><br /> {data.answeredUnanswered?.answered}</div>
              <div className="answer"><b>Unanswered:</b><br /> {data.answeredUnanswered?.unanswered}</div>
            </div>
            <div className="question-container">
              <div className="question">Question with the highest reputation</div>
              <div className="answer">{data.highestReputation?.title}</div>
              <div className="answer"><b>Reputation:</b><br /> {data.highestReputation?.owner?.reputation}</div>
            </div>
            <div className="question-container">
              <div className="question">Question with the fewest views</div>
              <div className="answer">{data.fewestViews?.title}</div>
              <div className="answer"><b>Views:</b><br /> {data.fewestViews?.view_count}</div>
            </div>
            <div className="question-container">
              <div className="question">Oldest and most recent questions</div>
              <div className="answer"><b>Oldest:</b><br /> {data.oldestRecent?.oldest?.title}</div>
              <div className="answer"><b>Most Recent:</b><br /> {data.oldestRecent?.most_recent?.title}</div>
            </div>
            <div className='table-section'>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSortBy('title')}>Question {sortBy === 'title' && sortOrder}</th>
                    <th onClick={() => handleSortBy('creation_date')}>Creation Date {sortBy === 'creation_date' && sortOrder}</th>
                    <th onClick={() => handleSortBy('reputation')}>Reputation {sortBy === 'reputation' && sortOrder}</th>
                    <th onClick={() => handleSortBy('view_count')}>View Count {sortBy === 'view_count' && sortOrder}</th>
                    <th onClick={() => handleSortBy('is_answered')}>Answered {sortBy === 'is_answered' && sortOrder}</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows()}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className='error-message'>
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default StackExchange;
