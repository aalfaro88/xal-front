import React, { useState, useEffect } from 'react';
import { get } from '../services/authService';
import './StackExchange.css'

const StackExchange = () => {
  const [data, setData] = useState({}); // holds the data from the API
  const [error, setError] = useState(null); // holds the error message
  const [isLoading, setIsLoading] = useState(true); // holds loading state

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const responseStackExchange = await get('/stackexchange');
        const responseAnsweredUnanswered = await get('/stackexchange/answered-unanswered');
        const responseHighestReputation = await get('/stackexchange/highest-reputation');
        const responseFewestViews = await get('/stackexchange/fewest-views');
        const responseOldestRecent = await get('/stackexchange/oldest-recent');

        setData({
          stackExchange: responseStackExchange.data,
          answeredUnanswered: responseAnsweredUnanswered.data,
          highestReputation: responseHighestReputation.data,
          fewestViews: responseFewestViews.data,
          oldestRecent: responseOldestRecent.data
        });
        setIsLoading(false); // Data is loaded, set isLoading to false
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        setIsLoading(false); // Error occurred, set isLoading to false
      }
    };

    // Call the function
    fetchData();
  }, []); 

  return (
    <div>
      <div>
        <h1>Stack Exchange API</h1>
      </div>
      <h2>Relevant Data</h2>
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
